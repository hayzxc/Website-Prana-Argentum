"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/simple-backend-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Eye, Users, FileText, Award, FileSpreadsheet } from "lucide-react"
import { FileUpload } from "@/components/file-upload"
import { UserManagement } from "@/components/user-management"
import { UserMenu } from "@/components/user-menu"
import { SpreadsheetManagement } from "@/components/spreadsheet-management"

interface Certificate {
  id: string
  name: string
  recipientEmail: string
  recipientName: string
  issueDate: string
  status: "valid" | "expired" | "revoked"
  fileUrl?: string
  fileName?: string
  fileSize?: number
  issuedBy: string
}

// Mock certificate functions
const getAllCertificates = (): Certificate[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("certificates")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const addCertificate = (cert: Omit<Certificate, "id">): Certificate => {
  const newCert: Certificate = {
    ...cert,
    id: `CERT-${Date.now()}`,
  }

  const certificates = getAllCertificates()
  certificates.push(newCert)
  localStorage.setItem("certificates", JSON.stringify(certificates))
  return newCert
}

const deleteCertificate = (id: string): boolean => {
  const certificates = getAllCertificates()
  const index = certificates.findIndex((cert) => cert.id === id)
  if (index > -1) {
    certificates.splice(index, 1)
    localStorage.setItem("certificates", JSON.stringify(certificates))
    return true
  }
  return false
}

const uploadCertificateFile = (file: File): Promise<{ url: string; fileName: string; fileSize: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file)
      resolve({
        url: fileUrl,
        fileName: file.name,
        fileSize: file.size,
      })
    }, 1000)
  })
}

export default function AdminDashboard() {
  const { user, loading: authLoading, getAllUsers } = useAuth()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [allUsers, setAllUsers] = useState<any[]>([])

  // Form state
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [certName, setCertName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      router.push("/dashboard")
      return
    }

    fetchData()
  }, [user, authLoading, router])

  const fetchData = async () => {
    try {
      const allCertificates = getAllCertificates()
      setCertificates(allCertificates)

      const users = await getAllUsers()
      setAllUsers(users)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadCertificate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let fileData = null

      // Upload file if selected
      if (selectedFile) {
        fileData = await uploadCertificateFile(selectedFile)
      }

      // Create certificate
      const newCert = addCertificate({
        name: certName,
        recipientEmail,
        recipientName,
        issueDate: new Date().toISOString().split("T")[0],
        status: "valid",
        issuedBy: user?.email || "",
        fileUrl: fileData?.url,
        fileName: fileData?.fileName,
        fileSize: fileData?.fileSize,
      })

      setCertificates([newCert, ...certificates])

      // Reset form
      setRecipientEmail("")
      setRecipientName("")
      setCertName("")
      setSelectedFile(null)

      alert("Certificate uploaded successfully!")
    } catch (error) {
      console.error("Error uploading certificate:", error)
      alert("Error uploading certificate")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return
    }

    try {
      const success = deleteCertificate(id)
      if (success) {
        setCertificates(certificates.filter((cert) => cert.id !== id))
        alert("Certificate deleted successfully!")
      } else {
        alert("Error deleting certificate")
      }
    } catch (error) {
      console.error("Error deleting certificate:", error)
      alert("Error deleting certificate")
    }
  }

  const handleViewCertificate = (cert: Certificate) => {
    if (cert.fileUrl) {
      window.open(cert.fileUrl, "_blank")
    } else {
      alert(`Viewing certificate: ${cert.name}`)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Kelola sertifikat, pengguna, dan spreadsheets</p>
          </div>
          <UserMenu />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Sertifikat</p>
                  <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {certificates.filter((c) => c.status === "valid").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                  <p className="text-2xl font-bold text-gray-900">{allUsers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileSpreadsheet className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Spreadsheets</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Manajemen Sertifikat</TabsTrigger>
            <TabsTrigger value="users">Manajemen Pengguna</TabsTrigger>
            <TabsTrigger value="spreadsheets">Manajemen Spreadsheets</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            {/* Upload Certificate Form */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Sertifikat Baru</CardTitle>
                <CardDescription>Buat dan terbitkan sertifikat baru untuk pengguna dengan file upload</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadCertificate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientEmail">Email Penerima</Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        required
                        placeholder="user@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Nama Penerima</Label>
                      <Input
                        id="recipientName"
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certName">Nama Sertifikat</Label>
                    <Input
                      id="certName"
                      type="text"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      required
                      placeholder="Project Management Professional"
                    />
                  </div>

                  <FileUpload
                    onFileSelect={setSelectedFile}
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={10}
                    disabled={uploading}
                  />

                  <Button type="submit" disabled={uploading} className="w-full md:w-auto">
                    {uploading ? "Uploading..." : "Upload Certificate"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Certificates Table */}
            <Card>
              <CardHeader>
                <CardTitle>Sertifikat yang Diterbitkan</CardTitle>
                <CardDescription>Daftar semua sertifikat yang telah diterbitkan</CardDescription>
              </CardHeader>
              <CardContent>
                {certificates.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada sertifikat yang diterbitkan</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penerima
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sertifikat
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal Terbit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            File
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {certificates.map((cert) => (
                          <tr key={cert.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{cert.recipientName}</div>
                                <div className="text-sm text-gray-500">{cert.recipientEmail}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{cert.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {cert.fileName ? (
                                <div className="text-sm">
                                  <div className="text-gray-900">{cert.fileName}</div>
                                  <div className="text-gray-500">
                                    {cert.fileSize ? `${(cert.fileSize / 1024 / 1024).toFixed(2)} MB` : ""}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400">No file</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant={cert.status === "valid" ? "default" : "destructive"}
                                className={cert.status === "valid" ? "bg-green-100 text-green-800" : ""}
                              >
                                {cert.status === "valid" ? "Valid" : "Tidak Valid"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleViewCertificate(cert)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteCertificate(cert.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="spreadsheets">
            <SpreadsheetManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
