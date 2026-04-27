import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Edit3, Search, Cpu, Languages, Layout, Mail, Play, Globe, Megaphone, FileText, Heart, Monitor, MousePointer2, Film, ChevronRight, X, Smartphone, AlertCircle, Newspaper, Image, Mic, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';

// --- DATA & CONTENT (Immutable Static Data) ---

const EDITORIAL_CATEGORIES = [
  {
    id: "cat1",
    title: "Auction Features & Sale Highlights",
    samples: [
      {
        title_en: "Echoes of hooves: power, memory and myth in Sanyu, Chagall and Basquiat",
        title_zh: "騏驥之境：常玉、夏加爾、巴斯奇亞的駿馬禮讚",
        desc_en: "Discover how modern masters harnessed equine symbolism across cultures and decades, as Sanyu, Chagall, and Basquiat each reimagine the horse in three iconic works coming to Christie’s Hong Kong Evening Sale",
        desc_zh: "三位現當代巨匠，三種神駿之姿，從東方到西方，跨越文化疆界與時代更迭，看藝術大師如何以馬爲媒，寄寓象徵",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20000837.png",
        link: "https://www.christies.com/zh/stories/echoes-of-hooves-power-memory-and-myth-in-sanyu-chagall-basquiat-2ce4ffd79c35499787862d844b43d0b9",
        tag: "Website"
      },
      {
        title_en: "Capturing light and shadow: moving images of Zhang Daqian’s Autumn Lotus in creation",
        title_zh: "光影留真，墨韻傳世：張大千作畫影片完整再現",
        desc_en: "Tokyo, 1956. At a Japanese inn, Zhang Daqian wields his brush like a great beam, and Autumn Lotus takes form before the camera. Decades later, the only surviving colour footage—now digitally restored—will be presented alongside the painting for the first time at Christie’s Hong Kong at The Henderson.",
        desc_zh: "1956 年東京，張大千於日式旅館揮毫，《秋荷》在鏡頭前翩然成形。數十年後，經數位修復的唯一彩色影像与畫作首次同場亮相",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20001304.png",
        link: "https://www.christies.com/zh/stories/capturing-light-and-shadow-moving-images-of-zhang-7b44c0edfeb1469b8f6909402451324c",
        tag: "Website"
      },
      {
        title_en: "Alchemy of time: the Rolex ‘Chinese Dragon’ cloisonné enamel dial reference 6100",
        title_zh: "時光淬煉：勞力士「中國龍」掐絲琺瑯錶盤型號 6100",
        desc_en: "From provenance, condition, craftsmanship to cultural significance, here’s why now is a once-in-a-generation chance to own a timepiece that unites mechanical precision and unbridled artistry",
        desc_zh: "從傳承淵源、品相狀態、工藝水準到文化意蘊，佳士得專家細述此枚凝聚機械與藝術之美時計的收藏價值",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20001557.png",
        link: "https://www.christies.com/zh/stories/alchemy-of-time-the-rolex-chinese-dragon-70583df1ce78489fa59ca970b69d89bc",
        tag: "Website"
      },
      {
        title_en: "Statement of style: spring & summer handbag fashion guide",
        title_zh: "風格宣言：春夏手袋時尚圖鑑",
        desc_en: "Handbags as a style statement: Christie’s experts decode how bags evolve into statements that shape and express personal style",
        desc_zh: "手袋即態度：佳士得專家解析手袋如何蛻變為塑造與彰显個人風格的時尚宣言",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/statement.png",
        link: "https://www.christies.com/zh/stories/spring-and-summer-handbag-fashion-guide-3eda859e74314140928b3b042c5e0274",
        tag: "Website"
      }
    ]
  },
  {
    id: "cat2",
    title: "profile stories",
    samples: [
      {
        title_en: "Within and beyond the saleroom: collector Ambrose Lee shares his journey with Christie’s",
        title_zh: "拍場內外：新晉藏家李小明的佳士得購藏之旅",
        desc_en: "Seasoned banker Ambrose Lee is also a connoisseur of the beauty of art. Through continuous and in-depth engagement with the Christie’s team both within and beyond the saleroom.",
        desc_zh: "出身金融界的李小明（Ambrose Lee）同時也是深諳藝術之美的收藏家，透過與佳士得團隊在拍場內外的持續深入交流，構築起獨樹一幟的藝術珍藏",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20002127.png",
        link: "https://www.christies.com/zh/stories/collector-ambrose-lee-shares-his-journey-with-christies-ba49f55d120a46549607c35dcf5efccb",
        tag: "Website"
      },
      {
        title_en: "What I’ve learned: Ronny Hsu, Head of Sale of Jewellery at Christie’s Asia-Pacific",
        title_zh: "習有所得：亞太區珠寶部拍賣主管許仁瑋",
        desc_en: "The Vice President and Head of Sale of Jewellery reflects on career opportunities and challenges, shares his favorite jewellery categories, and offers candid advice for collectors",
        desc_zh: "佳士得亞太區副總裁暨珠寶部拍賣主管回顧入行以來獲取的機優與挑戰，分享自己最喜愛的珠寶類別，以及對珠寶藏家的真誠建议",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20002948.png",
        link: "https://www.christies.com/zh/stories/discover-the-dazzling-world-of-jewellery-with-ronny-hsu-48515542de054a7085ce58265bd14c73",
        tag: "Website"
      },
      {
        title_en: "Living with timeless treasures: Mimi Wong's four-decade journey with Classic Chinese furniture",
        title_zh: "木韻情長：王家琪的四十載中國古典家具收藏",
        desc_en: "‘Love at first sight almost never works. You must act decisively, but never impulsively’: with four decades of odyssey in collecting Classic Chinese furniture.",
        desc_zh: "「一見鍾情是行不通的。收藏要果斷，但更不能衝動。」走進 Mimi Wong 的古典家具世界，了解她的長期主义收藏理念",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20232043.png",
        link: "https://www.christies.com/zh/stories/living-with- timeless-treasures-mimi-wong-four-decade-journey-cd288d0f762243acb47746e888eb6a9b",
        tag: "Website"
      },
      {
        title_en: "Knowledge, passion, determination and patience: the legendary life of the esteemed Chinese Ceramics collector Au Bak Ling",
        title_zh: "博學多聞，福澤後世：著名瓷器藏家區百齡的傳傳奇人生",
        desc_en: "From humble beginnings, Mr. Au Bak Ling went on to establish a publishing empire. He achieved tremendous success and built one of the most remarkable private collections of Chinese ceramics",
        desc_zh: "從貧苦少年到出版業巨擘，再到世界頂尖瓷器收藏家，區百齡先生以嚴謹堅毅的人生哲學打造全球首屈一指的私人瓷器收藏",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20232012.png",
        link: "https://www.christies.com/zh/stories/the-legendary-life-of-au-bak-ling-0019205b44a34060b98f85882b3b657c",
        tag: "Website"
      }
    ]
  },
  {
    id: "cat3",
    title: "collecting & gift guides",
    samples: [
      {
        title_en: "Blue gems beyond the snow: a collecting guide to Kashmir sapphires",
        title_zh: "雪域之巔的藍色瑰寶：喀什米爾藍寶石收藏指南",
        desc_en: "What is the secret behind the legendary Kashmir sapphire's allure? Journey to uncover its mysteries while savouring the star lot, ‘The Royal Blue’, at Christie's Hong Kong Luxury Week",
        desc_zh: "欣賞佳士得香港秋拍領銜之作「The Royal Blue」項鏈，揭開傳奇喀什米爾藍寶石極致魅力的謎底",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding-image-group-2/main/Screenshot%202026-04-19%20001441.png",
        link: "https://www.christies.com/zh/stories/collecting-guide-to-kashmir-sapphires-9d8de78ef58048e59a0f25ba35aae910",
        tag: "Website"
      },
      {
        title_en: "Whimsical romance: a guide to Hermès Quelle Idole",
        title_zh: "天真無邪的浪漫玩偶：愛馬仕凱莉娃娃包收藏指南",
        desc_en: "This article will take you into Hermès’ most playful and imaginative universe, exploring the story of Hermès Quelle Idole from its birth to its popularity in the collector’s circle, and analyzing why this whimsical handbag has continuously achieved impressive and remarkable performance in the auction market",
        desc_zh: "本文將帶您踏入愛馬仕最具童心與想像力的宇宙，探尋其从誕生到風靡收藏界的故事，並分析爲何這款充滿玩趣的手袋能在拍賣市場上持續展現強勁表現",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding-image-group-2/main/Screenshot%202026-04-19%20002425.png",
        link: "https://www.christies.com/zh/stories/whimsical-romance-a-guide-to-hermes-quelle-idole-5e3bf38ab53f430aae205bfee25e9660",
        tag: "Website"
      }
    ]
  }
];

const COPYWRITING_SAMPLES = [
  {
    type: "Homepage Banner",
    layout: "device",
    icon: <Monitor size={20} />,
    images: [
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20152907.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20151736.png"
    ]
  },
  {
    type: "Video Script",
    layout: "integrated-video",
    icon: <Film size={20} />,
    videos: [
      {
        id: "vid-1",
        title: "Narrative Design and Scriptwriting", 
        headline: "1.18M organic views & positive feedback", 
        link: "https://www.douyin.com/video/7569132870460001551",
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20171043.png",
        platforms: ["DOUYIN", "WEBSITE"]
      }
    ]
  }
];

const MEDIA_CLIPS = [
  {
    title: "Sing Tao Daily",
    img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/clip%201.png",
    link: "https://www.stheadline.com/culture/3489694/%E4%BD%B3%E5%A3%AB%E5%BE%97%E4%BA%9E%E5%A4%AA%E5%8D%80%E6%89%8B%E8%A2%8B%E5%8F%8A%E9%85%8D%E9%A3%BE%E9%83%A8%E5%B0%88%E5%AE%B6%E8%AB%87%E6%89%8B%E8%A2%8B%E6%8A%95%E8%B3%87%E5%83%B9%E5%80%BC-%E7%8E%87%E5%85%88%E8%B3%9E8%E6%9C%88%E7%B6%B2%E6%8B%8D%E5%BD%A9%E8%AA%BF%E6%84%9B%E9%A6%AC%E4%BB%95%E8%A2%8B%E6%BC%BE-%E5%BC%95%E9%A0%98%E7%9B%9B%E5%A4%8F%E6%99%82%E5%B0%9A%E6%BD%AE%E6%B5%81#google_vignette"
  }
];

// --- APP COMPONENT ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const profileImg = "https://raw.githubusercontent.com/lizzyli1856-blip/coding/be2069dacb557d2f61149da75e14154781019966/Image.jpeg";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600&display=swap');
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      body { background-color: #FDFBF7; color: #111111; margin: 0; }
      .mockup-desktop {
        position: relative;
        width: 100%;
        height: 480px;
        background: #222;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 40px 80px -20px rgba(0,0,0,0.1);
        overflow: hidden;
        border: 12px solid #222;
        border-bottom-width: 24px;
      }
    `;
    document.head.appendChild(style);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl tracking-widest font-serif cursor-pointer" onClick={() => navigateTo('home')}>LIZZY LI</div>
          <div className="flex space-x-8 text-xs tracking-[0.2em] font-medium text-[#8B8574]">
            {['ABOUT', 'WORK', 'CONTACT'].map((item) => (
              <button 
                key={item} 
                onClick={() => navigateTo(item.toLowerCase())} 
                className={`transition-colors hover:text-[#111111] ${activePage.startsWith(item.toLowerCase()) ? 'text-[#111111] border-b border-[#C5A059]' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow pt-32 pb-24">
        {activePage === 'home' && <HomeView navigateTo={navigateTo} profileImg={profileImg} />}
        {activePage === 'about' && <AboutView profileImg={profileImg} />}
        {activePage.startsWith('work') && <WorkView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      <footer className="border-t border-[#E5E2D9] py-8 text-center text-[10px] tracking-widest text-[#8B8574] uppercase">
        © {new Date().getFullYear()} LIZZY LI. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

// --- VIEWS ---

const HomeView = ({ navigateTo, profileImg }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-fade-in">
    <div className="w-48 h-48 mb-12 rounded-full overflow-hidden shadow-xl border border-[#E5E2D9]">
      <img src={profileImg} className="w-full h-full object-cover" alt="Lizzy Li" />
    </div>
    <h1 className="font-serif text-3xl md:text-5xl text-[#111111] max-w-4xl leading-tight mb-8">
      Curating stories that embody the brand’s philosophy and aesthetic, support business objectives, and help solve business challenges.
    </h1>
    <p className="text-[#666666] max-w-2xl mb-12 font-light leading-relaxed">
      Content and communications professional with 2+ years of experience in art and luxury, specialising in turning brand narratives into measurable growth.
    </p>
    <div className="flex gap-6">
      <button onClick={() => navigateTo('work')} className="bg-[#111111] text-white px-10 py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-all">Explore Work</button>
      <button onClick={() => navigateTo('contact')} className="border border-[#111111] px-10 py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-all">Contact</button>
    </div>
  </div>
);

const AboutView = ({ profileImg }) => (
  <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in flex flex-col items-center">
    <div className="w-40 h-40 rounded-full overflow-hidden mb-16 shadow-lg">
      <img src={profileImg} className="w-full h-full object-cover" alt="Profile" />
    </div>
    <div className="text-center space-y-12">
      <h2 className="font-serif text-3xl md:text-4xl italic">A strategic storyteller with a curator’s eye.</h2>
      <div className="bg-white border border-[#E5E2D9] p-12 text-justify text-[#444444] leading-loose font-light">
        I have built expertise in the art and luxury sector since 2024, progressing from an intern to an officer role within Christie’s Content & Communications team. Having supported high-profile brand collaborations and integrated content strategies, I create clear, brand-aligned narratives that bridge commercial objectives with elegant communication.
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
        {["Brand Storytelling", "Content Strategy", "Public Relations", "Transcreation"].map(skill => (
          <div key={skill} className="py-3 px-4 border border-[#C5A059]/30 text-[#C5A059] text-[10px] tracking-widest uppercase rounded-full bg-[#C5A059]/5">
            {skill}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WorkView = () => {
  const [tab, setTab] = useState('projects');
  return (
    <div className="max-w-7xl mx-auto px-6 animate-fade-in">
      <div className="flex justify-center gap-12 mb-20 border-b border-[#E5E2D9] pb-4">
        {['PROJECTS', 'SKILLS'].map(t => (
          <button 
            key={t} 
            onClick={() => setTab(t.toLowerCase())} 
            className={`text-xs tracking-[0.3em] transition-all pb-2 ${tab === t.toLowerCase() ? 'text-[#111111] border-b-2 border-[#C5A059]' : 'text-[#8B8574]'}`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'projects' ? <KeyProjects /> : <SkillShowcases />}
    </div>
  );
};

const KeyProjects = () => (
  <div className="space-y-48 pb-20">
    <section>
      <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-4">Project 01 / Co-Branding</span>
      <h3 className="font-serif text-3xl mb-12">Christie’s × Vogue</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="aspect-video bg-black rounded shadow-2xl overflow-hidden">
          <video className="w-full h-full object-cover" controls src="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/202604222023%20(7).mp4" poster="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/voguecover.png" />
        </div>
        <div className="text-sm text-[#444444] font-light leading-relaxed space-y-6">
          <p>I played a key role in shaping the content strategy, editorial writing, and brand narrative in Christie’s co-branding initiative with Vogue.</p>
          <p>Collaborated on the campaign’s brand book, contributing to specialist interviews, collector profiles, and a structured buying guide to engage young audiences while protecting Christie’s legacy.</p>
        </div>
      </div>
    </section>
  </div>
);

const SkillShowcases = () => {
  const [sub, setSub] = useState('editorial');
  return (
    <div className="space-y-16">
      <div className="flex flex-wrap justify-center gap-4">
        {['editorial', 'copywriting', 'pr', 'transcreation'].map(s => (
          <button key={s} onClick={() => setSub(s)} className={`px-8 py-3 border text-[10px] tracking-widest uppercase transition-all ${sub === s ? 'bg-[#111111] text-white border-[#111111]' : 'border-[#E5E2D9] text-[#8B8574]'}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Simplified grid output for preview */}
        <div className="p-8 border border-[#E5E2D9] bg-white text-center italic text-[#8B8574]">
          Showcasing curated work in {sub.toUpperCase()} category...
        </div>
      </div>
    </div>
  );
};

const ContactView = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in">
    <h2 className="font-serif text-3xl mb-8">Get In Touch</h2>
    <a href="mailto:lizzyli1856@gmail.com" className="text-xl tracking-widest border-b border-[#111111] pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-all">
      lizzyli1856@gmail.com
    </a>
  </div>
);
