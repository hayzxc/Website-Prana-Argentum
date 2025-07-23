"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/simple-backend-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download, FileText } from "lucide-react"
import { CertificatePreview } from "@/components/certificate-preview"
import { UserMenu } from "@/components/user-menu"
import { SpreadsheetViewer } from "@/components/spreadsheet-viewer"

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

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (user.role === "admin") {
      router.push("/admin")
      return
    }

    fetchCertificates()
  }, [user, authLoading, router])

  const fetchCertificates = async () => {
    try {
      // Get certificates from localStorage and filter by user email
      const storedCertificates = localStorage.getItem("certificates")
      const allCertificates = storedCertificates ? JSON.parse(storedCertificates) : []
      const userCertificates = allCertificates.filter((cert: Certificate) => cert.recipientEmail === user?.email)

      setCertificates(userCertificates)
    } catch (error) {
      console.error("Error fetching certificates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewCertificate = (cert: Certificate) => {
    if (cert.fileUrl) {
      window.open(cert.fileUrl, "_blank")
    } else {
      alert(`Viewing certificate: ${cert.name}`)
    }
  }

  const handleDownloadCertificate = (cert: Certificate) => {
    if (cert.fileUrl && cert.fileName) {
      const link = document.createElement("a")
      link.href = cert.fileUrl
      link.download = cert.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert(`Downloading certificate: ${cert.name}`)
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
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Saya</h1>
            <p className="text-gray-600 mt-2">Selamat datang, {user?.name}</p>
          </div>
          <UserMenu />
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Ringkasan Akun
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-600">Total Sertifikat</h3>
                  <p className="text-2xl font-bold text-blue-800">{certificates.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-600">Aktif</h3>
                  <p className="text-2xl font-bold text-green-800">
                    {certificates.filter((c) => c.status === "valid").length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-600">Spreadsheets</h3>
                  <p className="text-2xl font-bold text-purple-800">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="certificates">Sertifikat Saya</TabsTrigger>
            <TabsTrigger value="spreadsheets">Spreadsheets</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Sertifikat Saya</CardTitle>
                <CardDescription>Daftar semua sertifikat yang telah Anda terima</CardDescription>
              </CardHeader>
              <CardContent>
                {certificates.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Belum ada sertifikat yang diterbitkan untuk Anda</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                      <Card key={cert.id} className="certificate-card">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{cert.name}</h4>
                              <p className="text-gray-500 text-sm">
                                Diterbitkan: {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                              </p>
                            </div>
                            <Badge
                              variant={cert.status === "valid" ? "default" : "destructive"}
                              className={cert.status === "valid" ? "bg-green-100 text-green-800" : ""}
                            >
                              {cert.status === "valid" ? "Valid" : "Tidak Valid"}
                            </Badge>
                          </div>

                          <CertificatePreview certificateName={cert.name} className="w-full mb-4" />

                          {cert.fileName && (
                            <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
                              <p className="font-medium">File: {cert.fileName}</p>
                              {cert.fileSize && (
                                <p className="text-gray-600">Size: {(cert.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                              )}
                            </div>
                          )}

                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCertificate(cert)}
                              className="flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadCertificate(cert)}
                              className="flex items-center"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spreadsheets">
            <SpreadsheetViewer userEmail={user?.email || ""} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
