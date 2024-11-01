import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Menu } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const slides = [
    { 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nekccnfBWBgYMdum7H3zhoYSq1HFtC.png",
      link: "/vpas-details",
      showButton: true
    },
    { 
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PrafiEvyLIuXHfR1mZaPKWizMJJ2Nj.png",
      link: "/nurse",
      showButton: true
    },
  ];

  const services = [
    { name: "香港升学", description: "我们为学生提供一站式升学服务，包括院校申请、签证办理、留学规划等，全方位支持学生实现香港升学梦想。" },
    { name: "DSE规划", description: "提供全面的香港中学文凭考试（DSE）规划，包括科目选择、学习策略、应试技巧等，帮助学生在DSE中取得优异成绩。" },
    { name: "香港游学", description: "我们为学生设计丰富的香港游学项目，让学生体验香港的文化和教育体系，开阔国际视野并激发学习兴趣。" },
    { name: "STEM竞赛课程", description: "提供丰富的STEM竞赛课程与辅导，帮助学生掌握科学、技术、工程和数学知识，培养创新能力，参与各类国际竞赛。" },
    { name: "职业转码", description: "提供面向职业转型的编程与技术课程，从零开始帮助学员掌握编程技能，顺利进入IT行业，实现职业生涯的突破。" },
    { name: "香港身份", description: "协助办理香港身份，包括工作签证、学生签证等，帮助您顺利落户香港，享受多元化的生活与教育资源。" }
  ];

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map(slide => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    
    loadImages();
  }, [slides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleLearnMore = (e, link) => {
    e.preventDefault();
    router.push(link);
  };

  const handleSlideChange = (direction) => {
    if (direction === 'next') {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    } else {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center justify-center">
            <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241023204921-2n2dxUJCpGShGsKC8KTLw2g6tvLRM6.jpg" alt="香港优升国际有限公司 Logo" width={50} height={50} />
            <div className="ml-2">
              <span className="text-xl font-bold text-gray-800">香港优升国际有限公司</span>
              <p className="text-sm text-gray-600">香港多元化教育与升学一条龙服务</p>
            </div>
          </Link>
          
          <nav className="hidden lg:flex gap-6">
            {services.map((service, index) => (
              <Link key={index} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#">
                {service.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" passHref>
              <Button className="hidden md:inline-flex bg-primary text-white hover:bg-primary/90">
                在线咨询
              </Button>
            </Link>
            
            <div className="lg:hidden">
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg lg:hidden z-50">
          <nav className="flex flex-col p-4">
            {services.map((service, index) => (
              <Link
                key={index}
                className="py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                href="#"
                onClick={() => setIsMenuOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-1">
        <section className="relative w-full h-[800px] md:h-[900px] lg:h-[1000px] overflow-hidden">
          {!imagesLoaded && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          )}
          
          {imagesLoaded && slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 flex items-center justify-center ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={slide.image} alt="Slide image" layout="fill" objectFit="contain" />
              {slide.showButton && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                  <Button
                    onClick={(e) => handleLearnMore(e, slide.link)}
                    className="bg-white bg-opacity-50 text-primary hover:bg-white hover:bg-opacity-75 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
                  >
                    了解更多
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-20"
            onClick={() => handleSlideChange('prev')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 z-20"
            onClick={() => handleSlideChange('next')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-800">
              VPAS项目详细介绍
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-1.png" alt="职专毕业生留港计划" width={500} height={300} objectFit="cover" />
              </div>
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-2.png" alt="申请条件" width={500} height={300} objectFit="cover" />
              </div>
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-3.png" alt="VPAS计划简介" width={500} height={300} objectFit="cover" />
              </div>
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-4.png" alt="VPAS计划涵盖的五大行业" width={500} height={300} objectFit="cover" />
              </div>
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-5.png" alt="VPAS留港签证" width={500} height={300} objectFit="cover" />
              </div>
              <div className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Image src="/images/vpas/image-6.png" alt="修读+就业获取香港永居的全过程" width={500} height={300} objectFit="cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">联系我们</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" /> 
                  香港九龙观塘道342-344泉源工业大厦3楼A区40室
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" /> 
                  00852-51306929
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" /> 
                  info@hkupgrade.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">快速链接</h3>
              <nav className="grid grid-cols-2 gap-2">
                {services.map((service, index) => (
                  <Link 
                    key={index} 
                    className="text-gray-300 hover:text-white transition-colors"
                    href="#"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
