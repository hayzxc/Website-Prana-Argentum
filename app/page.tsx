import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Mail, Phone, MapPin, Ship, Container, Warehouse, Package } from "lucide-react"
import Link from "next/link"
import { PlaceholderImage } from "@/components/placeholder-image"
import { CompanyLogo } from "@/components/company-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 animate-fade-in">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in">
            <span className="italic font-extrabold">AFAS</span> Treatment Provider and
            Cargo Marine Surveyor
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Prana Argentum menyediakan layanan fumigasi kontainer, kapal, dan gudang yang komprehensif di Surabaya
            dengan standar internasional dan sertifikasi resmi.
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Konsultasi Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <a
                href="https://wa.me/6280000000000?text=Halo%20saya%20ingin%20bertanya%20tentang%20layanan%20fumigasi"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Kami
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-slide-in">
              <PlaceholderImage
                width={600}
                height={400}
                text="Fumigation Process"
                alt="Professional fumigation team working on container"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Tentang Prana Argentum</h2>
              <p className="text-gray-600 mb-4">
                Prana Argentum adalah perusahaan penyedia layanan fumigasi terkemuka yang berkantor pusat di Surabaya,
                mengkhususkan diri dalam fumigasi kontainer FCL/LCL, kapal, dan gudang untuk memastikan keamanan dan
                kualitas barang selama penyimpanan dan transportasi.
              </p>
              <p className="text-gray-600 mb-6">
                Dengan pengalaman bertahun-tahun dan tim profesional bersertifikat, kami berkomitmen untuk memberikan
                solusi fumigasi yang efektif, aman, dan sesuai dengan standar internasional ISPM-15 dan regulasi
                maritim.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg stagger-item">
                  <h3 className="font-semibold text-blue-600">Pengalaman</h3>
                  <p className="text-2xl font-bold text-gray-800">15+ Tahun</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg stagger-item">
                  <h3 className="font-semibold text-blue-600">Kontainer Ditangani</h3>
                  <p className="text-2xl font-bold text-gray-800">10,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 animate-fade-in">Layanan Fumigasi Kami</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Kami menyediakan layanan fumigasi komprehensif untuk berbagai kebutuhan logistik dan maritim dengan standar
            keselamatan tertinggi
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="certificate-card stagger-item">
              <CardContent className="p-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Container className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fumigasi FCL</h3>
                <p className="text-gray-600 mb-4">
                  Fumigasi kontainer penuh (Full Container Load) 20 feet dan 40 feet dengan gas Phosphine atau Methyl
                  Bromide.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Kontainer 20 feet</p>
                  <p>• Kontainer 40 feet</p>
                  <p>• Sertifikat ISPM-15</p>
                </div>
              </CardContent>
            </Card>

            <Card className="certificate-card stagger-item">
              <CardContent className="p-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fumigasi LCL</h3>
                <p className="text-gray-600 mb-4">
                  Fumigasi untuk muatan parsial (Less Container Load) dengan penanganan khusus untuk berbagai jenis
                  komoditas.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Muatan parsial</p>
                  <p>• Groupage cargo</p>
                  <p>• Penanganan khusus</p>
                </div>
              </CardContent>
            </Card>

            <Card className="certificate-card stagger-item">
              <CardContent className="p-6">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Ship className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fumigasi Kapal</h3>
                <p className="text-gray-600 mb-4">
                  Fumigasi kapal cargo dan ruang muat untuk mencegah hama dan memenuhi regulasi pelabuhan internasional.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Ruang muat kapal</p>
                  <p>• Cargo hold</p>
                  <p>• Sertifikat maritim</p>
                </div>
              </CardContent>
            </Card>

            <Card className="certificate-card stagger-item">
              <CardContent className="p-6">
                <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Warehouse className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fumigasi Gudang</h3>
                <p className="text-gray-600 mb-4">
                  Fumigasi gudang dan fasilitas penyimpanan untuk melindungi komoditas dari serangan hama dan serangga.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Gudang penyimpanan</p>
                  <p>• Cold storage</p>
                  <p>• Fasilitas logistik</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Spesifikasi Layanan Fumigasi</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-4">Fumigasi Kontainer FCL</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Kontainer 20 feet (TEU)</p>
                      <p className="text-sm text-gray-600">Volume: 33.2 m³, Kapasitas: 28.3 ton</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Kontainer 40 feet (FEU)</p>
                      <p className="text-sm text-gray-600">Volume: 67.7 m³, Kapasitas: 26.5 ton</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Gas Fumigan</p>
                      <p className="text-sm text-gray-600">Phosphine (PH3), Methyl Bromide (CH3Br)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-4">Sertifikasi & Standar</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">ISPM-15 Compliance</p>
                      <p className="text-sm text-gray-600">Standar internasional untuk kayu kemasan</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Sertifikat Fumigasi</p>
                      <p className="text-sm text-gray-600">Dokumen resmi untuk ekspor-impor</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">Monitoring 24/7</p>
                      <p className="text-sm text-gray-600">Pemantauan konsentrasi gas real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
            Proses Fumigasi Profesional
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center stagger-item">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Inspeksi Awal</h3>
              <p className="text-gray-600">Pemeriksaan kondisi kontainer/gudang dan identifikasi jenis hama</p>
            </div>

            <div className="text-center stagger-item">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Persiapan</h3>
              <p className="text-gray-600">Penyegelan dan persiapan area fumigasi sesuai standar keselamatan</p>
            </div>

            <div className="text-center stagger-item">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Aplikasi Gas</h3>
              <p className="text-gray-600">Aplikasi gas fumigan dengan dosis dan waktu yang tepat</p>
            </div>

            <div className="text-center stagger-item">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sertifikasi</h3>
              <p className="text-gray-600">Penerbitan sertifikat fumigasi resmi dan dokumentasi lengkap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Portal Section */}
      <section id="certifications" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in">
            Portal Sertifikasi Digital
          </h2>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-lg shadow-lg mx-auto mb-6 max-w-md certificate-card">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">SERTIFIKAT FUMIGASI</h4>
                <p className="text-sm text-gray-600 mb-4">Resmi • Terverifikasi • Internasional</p>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium inline-block">
                  ISPM-15 CERTIFIED ✓
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 animate-slide-in">Akses Sertifikat Fumigasi Anda</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Klien dapat mengakses dan mengunduh sertifikat fumigasi digital mereka. Administrator dapat mengelola dan
              menerbitkan sertifikat baru untuk setiap layanan fumigasi yang telah diselesaikan.
            </p>
            <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Login untuk Akses Sertifikat
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in">
              <h2 className="text-3xl font-bold mb-6">Hubungi Kami Sekarang</h2>
              <p className="text-blue-100 mb-8">
                Dapatkan konsultasi gratis untuk kebutuhan fumigasi kontainer, kapal, atau gudang Anda. Tim ahli kami
                siap memberikan solusi terbaik.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-blue-300" />
                  <div>
                    <p className="font-semibold">(031) 99021411</p>
                    <p className="text-blue-200 text-sm">Hotline 24/7</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-blue-300" />
                  <div>
                    <p className="font-semibold">info@pranaargentum.com</p>
                    <p className="text-blue-200 text-sm">Email resmi</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 text-blue-300 mt-1" />
                  <div>
                    <p className="font-semibold">Kantor Pusat Surabaya</p>
                    <p className="text-blue-200 text-sm">
                      Jl. Ikan Mungsing V No.75, Perak Barat
                      <br />
                      Kec. Krembangan, Surabaya, Jawa Timur
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Card className="bg-white text-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Request Quotation</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Jenis Layanan</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Fumigasi FCL 20 feet</option>
                        <option>Fumigasi FCL 40 feet</option>
                        <option>Fumigasi LCL</option>
                        <option>Fumigasi Kapal</option>
                        <option>Fumigasi Gudang</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Jumlah Kontainer</label>
                      <input type="number" className="w-full p-2 border rounded-md" placeholder="1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Lokasi</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Pelabuhan Tanjung Perak"
                      />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Kirim Permintaan</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-slide-in">
              <div className="flex items-center space-x-2 mb-4">
                <CompanyLogo size="sm" />
                <span className="text-xl font-semibold">Prana Argentum</span>
              </div>
              <p className="text-blue-100 mb-4">
                Spesialis fumigasi kontainer, kapal, dan gudang dengan standar internasional.
              </p>
              <div className="text-sm text-blue-200">
                <p>Sertifikat ISPM-15</p>
                <p>ISO 9001:2015</p>
              </div>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Layanan Fumigasi</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Fumigasi FCL 20 feet</li>
                <li>Fumigasi FCL 40 feet</li>
                <li>Fumigasi LCL</li>
                <li>Fumigasi Kapal</li>
                <li>Fumigasi Gudang</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Area Layanan</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Pelabuhan Tanjung Perak</li>
                <li>Terminal Petikemas</li>
                <li>Kawasan Industri</li>
                <li>Gudang Logistik</li>
                <li>Fasilitas Cold Storage</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="text-lg font-semibold mb-4">Kontak Darurat</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>24/7 Hotline</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Emergency Response</span>
                </li>
                <li>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 mt-2" asChild>
                    <a href="https://wa.me/6280000000000" target="_blank" rel="noreferrer">
                      WhatsApp 24/7
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100 animate-fade-in">
            <p>© 2025 Prana Argentum. Semua hak dilindungi. | Fumigasi Profesional Surabaya</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
