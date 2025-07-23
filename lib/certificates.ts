export interface Certificate {
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
  serviceType?: "FCL_20" | "FCL_40" | "LCL" | "SHIP" | "WAREHOUSE"
  containerNumber?: string
  vesselName?: string
  location?: string
}

// Mock certificate database with fumigation-specific data
let certificates: Certificate[] = [
  {
    id: "CERT-2023-001",
    name: "Sertifikat Fumigasi FCL 20 Feet",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-15",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "FCL_20",
    containerNumber: "TEMU1234567",
    location: "Pelabuhan Tanjung Perak",
  },
  {
    id: "CERT-2023-002",
    name: "Sertifikat Fumigasi FCL 40 Feet",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-10",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "FCL_40",
    containerNumber: "MSKU7654321",
    location: "Terminal Petikemas Surabaya",
  },
  {
    id: "CERT-2023-003",
    name: "Sertifikat Fumigasi Kapal MV Ocean Star",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-05",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "SHIP",
    vesselName: "MV Ocean Star",
    location: "Pelabuhan Tanjung Perak",
  },
]

export function getCertificatesByEmail(email: string): Certificate[] {
  return certificates.filter((cert) => cert.recipientEmail === email)
}

export function getAllCertificates(): Certificate[] {
  return certificates
}

export function addCertificate(cert: Omit<Certificate, "id">): Certificate {
  const newCert: Certificate = {
    ...cert,
    id: `CERT-${Date.now()}`,
  }
  certificates.push(newCert)

  // Save to localStorage for persistence
  localStorage.setItem("certificates", JSON.stringify(certificates))
  return newCert
}

export function deleteCertificate(id: string): boolean {
  const index = certificates.findIndex((cert) => cert.id === id)
  if (index > -1) {
    certificates.splice(index, 1)
    localStorage.setItem("certificates", JSON.stringify(certificates))
    return true
  }
  return false
}

// Load certificates from localStorage on initialization
if (typeof window !== "undefined") {
  const storedCertificates = localStorage.getItem("certificates")
  if (storedCertificates) {
    certificates = JSON.parse(storedCertificates)
  }
}

// File upload simulation
export function uploadCertificateFile(file: File): Promise<{ url: string; fileName: string; fileSize: number }> {
  return new Promise((resolve) => {
    // Simulate file upload delay
    setTimeout(() => {
      // In a real app, this would upload to a cloud storage service
      const fileUrl = URL.createObjectURL(file)
      resolve({
        url: fileUrl,
        fileName: file.name,
        fileSize: file.size,
      })
    }, 1000)
  })
}

// Service type mapping
export const SERVICE_TYPES = {
  FCL_20: "Fumigasi FCL 20 Feet",
  FCL_40: "Fumigasi FCL 40 Feet",
  LCL: "Fumigasi LCL",
  SHIP: "Fumigasi Kapal",
  WAREHOUSE: "Fumigasi Gudang",
}
