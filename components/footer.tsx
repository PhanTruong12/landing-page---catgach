import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-semibold tracking-wide">Cắt Gạch Trần Nam Trung</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Dịch vụ cắt gạch tại Đà Nẵng với các hạng mục: cắt granite/ceramic, cắt len chân tường, cắt CNC, gạch đá
              cầu thang và mosaic trang trí.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Điều hướng</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#projects" className="hover:text-foreground transition-colors">
                  Hạng mục
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  Năng lực
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-foreground transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:0704599599" className="hover:text-foreground transition-colors">
                  Hotline: 0704.599.599
                </a>
              </li>
              <li>
                <span>Xưởng: 05 Trần Nam Trung, Hoà Xuân, Cẩm Lệ, Đà Nẵng</span>
              </li>
              <li>
                <a href="https://tndgranite.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                  Website công ty: tndgranite.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Cắt Gạch Trần Nam Trung. Bảo lưu mọi quyền.</p>
          <p>Phục vụ gia công cắt gạch tại Đà Nẵng.</p>
        </div>
      </div>
    </footer>
  )
}
