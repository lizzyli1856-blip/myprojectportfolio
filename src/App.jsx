import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ArrowRight, Camera, Edit3, Search, Cpu, Languages, Layout, Mail, Play, Globe, Megaphone, FileText, Heart, Monitor, MousePointer2, Film, ChevronRight, X, Smartphone, AlertCircle, Newspaper, Image, Mic, Sparkles, CheckCircle2, ChevronLeft } from 'lucide-react';

// --- DATA & CONTENT ---

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
      },
      {
        title_en: "Snakes alive: the Chinese New Year celebrated in 12 objects",
        title_zh: "蛇影生輝：12件精彩傑作慶祝中國新年",
        desc_en: "We look at how the reptile has been embraced and celebrated by jewellers, painters, sculptors, watchmakers and more",
        desc_zh: "從珠寶、繪畫、雕塑到手錶傑作，擁抱和頌揚靈蛇圖騰帶來的奇想創意",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-20%20124147.png",
        link: "https://www.christies.com/zh/stories/year-of-the-snake-in-12-objects-472d8107ce0d4124ac62247074f81ad0",
        tag: "Website"
      },
      {
        title_en: "Christie’s 2024 holiday gift guide",
        title_zh: "佳士得2024佳節送礼指南",
        desc_en: "Make it easy on yourself this holiday season with Christie’s curated cornucopia of unique ideas drawn from upcoming auctions, Shop and Private Sales",
        desc_zh: "佳士得悉心甄選一系列來自拍賣及網上商店和私人洽購中的精美臻品，為您提供佳節禮贈灵感",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-20%20124213.png",
        link: "https://www.christies.com/zh/stories/christies-2024-holiday-gift-guide-7473cb6f3dca401d8ff12e4d6a055632",
        tag: "Website"
      }
    ]
  },
  {
    id: "cat4",
    title: "CSR",
    samples: [
      {
        title_en: "How women pioneers shape the art world across centuries",
        title_zh: "她山之石：當暗湧成爲巨浪",
        desc_en: "To celebrate this year’s International Women’s Day, we spotlight the magnificent achievements of female trailblazers who, against all odds, helped define the course of art history",
        desc_zh: "值此國際三八婦女節之際，讓我們一同探尋女性贊護人在藝術世界裡留下的動人篇篇章，見證她們的眼光、膽識與魄力持續塑造著藝術的過去、現在與未來",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20133849.png",
        link: "https://www.christies.com/zh/stories/how-women-pioneers-shape-the-art-world-across-centuries-338dead34eaa4ea6bc53d3c2fed9e049",
        tag: "Website"
      },
      {
        title_en: "Shanghai exhibition | Celebrating Women: A Visual Dialogue of Her Narratives",
        title_zh: "上海特別展覽 | 致敬 「 她 」 : 繪畫中的女性叙事",
        desc_en: "Through the lens of body, emotion, and personal experience, Christie's Shanghai Special Exhibition presents the creative force of women as they shift from being objects of the gaze to voicing their own narratives",
        desc_zh: "佳士得上海特別展覽以身體、情緒與個人經驗為線索，呈現女性从被觀看到主動表達的创作力量",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20134012.png",
        link: "https://www.christies.com/zh/stories/celebrating-women-a-visual-dialogue-of-her-narratives-c7f653823f484ac6b7eb14aba1ccb410",
        tag: "Website"
      },
      {
        title_en: "The art of sustainability: how Christie’s continues to define environmental standards across land, sea and air",
        title_zh: "可持續發展的藝術：佳士得如何持續引領海陸空全方位環境標準",
        desc_en: "As global art leaders, making a more responsible art world a reality is an essential part of our pioneering work",
        desc_zh: "作為全球藝術市場領導者，佳士得致力開創並構建一個更加負責任的藝術世界",
        img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20133927.png",
        link: "https://www.christies.com/zh/stories/redefining-sustainability-2024-056598b498bc43e39a6d71f2f4f13ee6",
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
    title: "", 
    strategy: "", 
    cta: "", 
    link: "https://www.christies.com/zh", 
    hideText: true, 
    images: [
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20152907.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20151736.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20152349.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20152522.png"
    ]
  },
  {
    type: "Sale Landing Page",
    layout: "device",
    icon: <MousePointer2 size={20} />,
    title: "", 
    strategy: "", 
    cta: "EXPLORE MORE",
    link: "https://www.christies.com/zh/events/luxury-hong-kong/what-is-on#auctions",
    hideText: true, 
    images: [
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20155449.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/wtc%20sl.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/hbg%20sl.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20155917.png"
    ]
  },
  {
    type: "Company Profile",
    layout: "framed-gallery",
    icon: <FileText size={20} />,
    title: "", 
    strategy: "", 
    body: "", 
    cta: "",
    link: "#",
    hideText: true, 
    images: [
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20161221.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20161531.png",
      "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20161631.png"
    ]
  },
  {
    type: "Video Script",
    layout: "integrated-video",
    icon: <Film size={20} />,
    title: "Cinematic Narratives & BTS Stories",
    videos: [
      {
        id: "vid-7569132870460001551",
        title: "Narrative Design and Scriptwriting", 
        headline: "1.18M organic views & widespread positive comments", 
        body: "", 
        link: "https://www.douyin.com/video/7569132870460001551",
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-22%20171043.png",
        cta: "Watch Video",
        platforms: ["INSTAGRAM", "REDNOTE", "DOUYIN", "WEBSITE"]
      },
      {
        id: "vid-7542829169755917620",
        title: "Narrative Design and Scriptwriting", 
        headline: "Business promotion via collector-focused storytelling", 
        body: "", 
        link: "https://www.douyin.com/video/7542829169755917620",
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-19%20002127.png",
        cta: "Watch Video",
        platforms: ["INSTAGRAM", "REDNOTE", "DOUYIN", "WEBSITE"]
      }
    ]
  }
];

const PR_RELEASES = [
  {
    id: "pr-1",
    title: "Global year-end performance release",
    imgEN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR1EN.png",
    imgCN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR1CN.png",
    link: "https://press.christies.com/2025-christies-end-of-year-press-release-tc"
  },
  {
    id: "pr-2",
    title: "Results release",
    imgEN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/pr11.png",
    imgCN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/pr1.png",
    link: "https://press.christies.com/asia-market-leading-spring-20th21st-century-sales-total-hk8868m-us1133m-tc/"
  },
  {
    id: "pr-3",
    title: "Pre-sale announcement",
    imgEN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR2EN.png",
    imgCN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR2%20CN.png",
    link: "https://press.christies.com/john-shaw/"
  },
  {
    id: "pr-4",
    title: "Newsflash",
    imgEN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR3EN.png",
    imgCN: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/PR3CN.png",
    link: "https://press.christies.com/christies-hong-kong-magnificent-jewels-sale-totals-market-leading-hk-tc/"
  }
];

const MEDIA_CLIPS = [
  {
    title: "Sing Tao Daily",
    img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/clip%201.png",
    link: "https://www.stheadline.com/culture/3489694/%E4%BD%B3%E5%A3%AB%E5%BE%97%E4%BA%9E%E5%A4%AA%E5%8D%80%E6%89%8B%E8%A2%8B%E5%8F%8A%E9%85%8D%E9%A3%BE%E9%83%A8%E5%B0%88%E5%AE%B6%E8%AB%87%E6%89%8B%E8%A2%8B%E6%8A%95%E8%B3%87%E5%83%B9%E5%80%BC-%E7%8E%87%E5%85%88%E8%B3%9E8%E6%9C%88%E7%B6%B2%E6%8B%8D%E5%BD%A9%E8%AA%BF%E6%84%9B%E9%A6%AC%E4%BB%95%E8%A2%8B%E6%BC%BE-%E5%BC%95%E9%A0%98%E7%9B%9B%E5%A4%8F%E6%99%82%E5%B0%9A%E6%BD%AE%E6%B5%81#google_vignette"
  },
  {
    title: "Ming Pao",
    img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/clip%202.png",
    link: "https://ol.mingpao.com/ldy/cultureleisure/culture/20250919/1758213476942/%E7%A7%81%E4%BA%BA%E6%B4%BD%E8%B3%BC%E9%87%8F%E8%BA%AB%E9%81%B8%E9%85%8D-%E7%8F%8D%E5%93%81%E4%BA%A4%E6%98%93%E9%9D%88%E6%B4%BB%E5%BA%A6%E9%AB%98"
  },
  {
    title: "Tatler",
    img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/clip4.jpeg",
    link: "https://www.harpersbazaar.com.hk/fashion/Christie-s-the-royal-blue"
  },
  {
    title: "BAZAAR",
    img: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/clip%203.png",
    link: "https://mp.weixin.qq.com/s/Tqv_Y_qB7IKGx9fOOQmmqg"
  }
];

// --- APP COMPONENT ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 保持头像持久化展示，但不提供更新功能
  const [profileImg] = useState(() => {
    try {
      const saved = localStorage.getItem('lizzy_profile_persistent');
      if (saved && saved.includes('data:image')) return saved;
    } catch (e) {}
    return "https://raw.githubusercontent.com/lizzyli1856-blip/coding/be2069dacb557d2f61149da75e14154781019966/Image.jpeg";
  });

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
      .font-serif { font-family: 'Cormorant Garamond', serif; }
      .font-sans { font-family: 'Montserrat', sans-serif; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
      body { background-color: #FDFBF7; color: #111111; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-thumb { background: #E5E2D9; border-radius: 10px; }
      
      .masonry-grid {
        column-count: 3;
        column-gap: 1.5rem;
        width: 100%;
      }
      @media (max-width: 1024px) { .masonry-grid { column-count: 2; } }
      @media (max-width: 640px) { .masonry-grid { column-count: 1; } }
      .masonry-item {
        break-inside: avoid;
        margin-bottom: 1.5rem;
      }

      .mockup-desktop {
        position: relative;
        width: 100%;
        height: 480px;
        background: #222;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 50px 100px -20px rgba(0,0,0,0.15), 0 30px 60px -30px rgba(0,0,0,0.2);
        overflow: hidden;
        border: 12px solid #222;
        border-bottom-width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .carousel-container {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        position: relative;
      }
      .full-image-display {
        width: 100%;
        height: 100%;
        object-fit: contain; 
        background: #fff;
        display: block;
        margin: auto;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#FDFBF7]/95 backdrop-blur-md py-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl tracking-widest font-serif cursor-pointer hover:text-[#C5A059] transition-colors duration-300" onClick={() => navigateTo('home')}>
            LIZZY LI
          </div>
          <div className="flex space-x-6 md:space-x-12 text-[10px] md:text-sm tracking-[0.2em] font-medium text-[#8B8574]">
            {['ABOUT', 'WORK', 'CONTACT'].map((item) => (
              <button 
                key={item} 
                onClick={() => navigateTo(item.toLowerCase())} 
                className={`transition-colors duration-300 hover:text-[#111111] relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] after:transition-all after:duration-300 hover:after:w-full ${activePage.startsWith(item.toLowerCase()) ? 'text-[#111111] after:w-full' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-24">
        {activePage === 'home' && <HomeView navigateTo={navigateTo} profileImg={profileImg} />}
        {activePage === 'about' && <AboutView profileImg={profileImg} />}
        {activePage.startsWith('work') && <WorkView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E2D9] py-8 text-center text-xs tracking-widest text-[#8B8574]">
        <p>© {new Date().getFullYear()} LIZZY LI. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

// --- SHARED COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={`animate-fade-in opacity-0 ${className}`} 
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
};

// 只读版本的文本组件，移除了 contentEditable 逻辑
const StaticText = ({ id, initialText, className, element = "div" }) => {
  const Element = element;
  const [text] = useState(() => {
    try {
      return localStorage.getItem(`lizzy_edit_${id}`) || initialText;
    } catch (e) {
      return initialText;
    }
  });

  return (
    <Element className={`${className} whitespace-pre-wrap outline-none`}>
      {text}
    </Element>
  );
};

const DeviceCarousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12">
      <div className="mockup-desktop">
        <div className="carousel-container">
          <div className="absolute inset-0 flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
            {images.map((img, i) => (
              <div key={i} className="min-w-full h-full flex items-center justify-center bg-white">
                <img 
                  src={img} 
                  className="full-image-display" 
                  alt="Slide display" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/800x600?text=Image+Unavailable";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/90 rounded-full text-black transition-all shadow-lg backdrop-blur-sm z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/90 rounded-full text-black transition-all shadow-lg backdrop-blur-sm z-10">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${current === i ? 'w-8 bg-black/60' : 'w-2 bg-black/20'}`} />
          ))}
        </div>
      </div>
      <div className="h-2 w-48 bg-[#333] mx-auto -mt-1 rounded-b-md shadow-lg"></div>
    </div>
  );
};

// --- VIEWS ---

const HomeView = ({ navigateTo, profileImg }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6">
      <FadeIn delay={0.2} className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <div 
          className="w-56 h-56 md:w-56 md:h-56 mb-10 overflow-hidden relative group rounded-full shadow-xl border-[0.5px] border-[#E5E2D9]"
        >
          <img src={profileImg} alt="Lizzy Li" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        </div>
        
        <StaticText 
          id="hero-main-title" 
          element="h1" 
          className="font-serif text-3xl md:text-5xl text-[#111111] font-semibold leading-[1.3] mb-6 px-4" 
          initialText="Curating stories that embody the brand’s philosophy and aesthetic, support business objectives, and help solve business challenges." 
        />

        <StaticText 
          id="hero-sub-narrative" 
          element="p" 
          className="font-sans text-sm md:text-base text-[#666666] leading-relaxed max-w-2xl mx-auto mb-10 px-4 font-light" 
          initialText="Content and communications professional with 2+ years of experience in art and luxury, specialising in turning brand narratives into measurable growth. I help organisations find their voice and make it heard." 
        />
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          <button onClick={() => navigateTo('work')} className="bg-[#111111] text-white px-10 py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-all">Explore Work</button>
          <button onClick={() => navigateTo('contact')} className="border border-[#111111] text-[#111111] px-10 py-4 text-[10px] tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-all">Get In Touch</button>
        </div>
      </FadeIn>
    </div>
  );
};

const WorkView = () => {
  const [subTab, setSubTab] = useState('projects'); 
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <FadeIn>
        <div className="flex justify-center gap-8 md:gap-16 mb-20 border-b-[0.5px] border-[#E5E2D9] pb-4">
          <button onClick={() => setSubTab('projects')} className={`text-xs tracking-[0.3em] transition-all relative ${subTab === 'projects' ? 'text-[#111111] font-medium' : 'text-[#8B8574]'}`}>
            KEY PROJECTS
            {subTab === 'projects' && <span className="absolute -bottom-[17px] left-0 w-full h-[1.5px] bg-[#C5A059]"></span>}
          </button>
          <button onClick={() => setSubTab('skills')} className={`text-xs tracking-[0.3em] transition-all relative ${subTab === 'skills' ? 'text-[#111111] font-medium' : 'text-[#8B8574]'}`}>
            SKILL SHOWCASES
            {subTab === 'skills' && <span className="absolute -bottom-[17px] left-0 w-full h-[1.5px] bg-[#C5A059]"></span>}
          </button>
        </div>
      </FadeIn>
      <div className="min-h-[60vh] pb-20">
        {subTab === 'projects' ? <KeyProjects /> : <SkillShowcases />}
      </div>
    </div>
  );
};

const KeyProjects = () => (
  <div className="space-y-48">
    {/* Project 01 */}
    <div className="flex flex-col">
      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-4">Project 01 / Co-Branding</span>
        <h3 className="font-serif text-3xl mb-12">Christie’s × Vogue</h3>
        
        <div className="max-w-2xl mx-auto mb-16 shadow-2xl bg-black rounded-lg overflow-hidden relative">
          <video 
            className="w-full h-auto block" 
            controls 
            playsInline
            src="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/202604222023%20(7).mp4"
            poster="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/voguecover.png"
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-sm text-[#444444] font-light leading-relaxed text-justify mb-24 px-4">
        <div className="mb-8">
          <StaticText 
            id="p1-vogue-para1" 
            initialText="I played a key role in shaping the content strategy, editorial writing, and brand narrative in Christie’s co-branding initiative with Vogue, which launched to expand its reach beyond core auction audiences into the wider luxury lifestyle sector." 
          />
        </div>
        <div className="mb-8">
          <StaticText 
            id="p1-vogue-para2" 
            initialText="I collaborated closely on the campaign’s centrepiece brand book, contributing to key sections including an overview of Christie’s 40-year presence in Asia, major milestones, record-breaking highlights, specialist interviews and behind-the-scenes stories, collector profiles, and a structured buying guide to engage young, fashion-forward audiences while protecting Christie’s legacy and promoting its luxury sales." 
          />
        </div>
        <div>
          <StaticText 
            id="p1-vogue-para3" 
            initialText="Within three months, the campaign generated over half a million social impressions and thousands of website conversions, significantly strengthening brand recall among the target young fashion audience." 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
        {[
          "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-18%20195207.png", 
          "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-18%20195324.png", 
          "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-18%20195406.png", 
          "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/Screenshot%202026-04-18%20195502.png"
        ].map((img, i) => (
          <div key={i} className="relative z-10 hover:z-50 transition-all duration-300">
            <div className="bg-white border border-[#E5E2D9] aspect-square flex items-center justify-center p-2 overflow-hidden shadow-sm transition-transform duration-500 hover:scale-150 hover:shadow-2xl cursor-zoom-in group">
              <img src={img} className="max-w-full max-h-full object-contain" alt={`Christie's x Vogue project highlight ${i+1}`} />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Project 02 */}
    <div className="flex flex-col pt-32 border-t border-[#E5E2D9]/50">
      <div className="mb-10 text-center">
        <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-4">Project 02 / Video Series</span>
        <h3 className="font-serif text-3xl mb-12">Christie’s 40th Anniversary video content series</h3>
        
        <div className="max-w-2xl mx-auto mb-6 shadow-2xl bg-black rounded-lg overflow-hidden relative">
          <video 
            className="w-full h-auto block" 
            controls 
            playsInline
            src="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/202604222341.mp4"
            poster="https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/40%20cover.png"
          />
        </div>
        <div className="flex justify-center mb-16">
          <span className="px-3 py-1 border border-[#C5A059] text-[#C5A059] text-[8px] tracking-[0.2em] uppercase font-bold rounded-sm">Teaser</span>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-sm text-[#444444] font-light leading-relaxed text-justify px-4">
        <div className="mb-8">
          <StaticText 
            id="p2-40th-para1" 
            initialText="I serve as a core member deeply involved in the entire content planning and production process for Christie’s 40th anniversary content campaign, which aims to showcase Christie’s rich heritage and industry influence." 
          />
        </div>
        <div className="mb-8">
          <StaticText 
            id="p2-40th-para2" 
            initialText="My key contributions include supporting the manager in organizing and conducting interviews with nearly 30 key internal stakeholders, systematically distilling core insights from raw interview material, and developing the video structure and talking points that lay the foundation for subsequent shooting and other content outputs." 
          />
        </div>
        <div>
          <StaticText 
            id="p2-40th-para3" 
            initialText="This experience has demonstrated my ability to execute detail-oriented content work, identify key takeaways from fragmented information, synthesize them into cohesive, brand-aligned narratives, and collaborate with cross-functional teams to drive project progress." 
          />
        </div>
      </div>
    </div>

    {/* Project 03 & 04 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-32 border-t border-[#E5E2D9]/50 items-start">
      <div className="flex flex-col">
        <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-4">Project 03 / SEO & AI Search Optimization</span>
        <div className="min-h-[80px] flex items-center">
          <h3 className="font-serif text-2xl leading-tight">Luxury Category Content SEO & AI Search Optimization</h3>
        </div>
        <div className="text-sm text-[#444444] font-light leading-relaxed text-justify space-y-6 mt-4">
          <StaticText id="p3-seo-para1" initialText="I collaborate with Global SEO Lead to strengthen the brand’s entity associations and align the brand with core industry topics, establishing it as an authoritative voice in search to improve search rankings and enhance overall digital presence." />
          <StaticText id="p3-seo-para2" initialText="I achieve this by developing SEO-focused luxury category editorial content to expand our coverage for more search terms, while refining existing content to demonstrate expertise for both Google and our clients." />
          <StaticText id="p3-seo-para3" initialText="I approach content strategy with a growth-driven mindset: being visible where people search is more important than ever. Rather than creating content for its own sake, I focus on driving qualified, high-intent traffic to the most relevant pages and generating meaningful conversions, securing competitive advantages in the search landscape." />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase block mb-4">Project 04 / Product</span>
        <div className="min-h-[80px] flex items-center">
          <h3 className="font-serif text-2xl leading-tight">Internal Translation Tool Development</h3>
        </div>
        <div className="text-sm text-[#444444] font-light leading-relaxed text-justify space-y-6 mt-4">
          <StaticText id="p4-tool-para1" initialText="I collaborate with the Digital Solutions team to build a custom internal English‑Chinese translation tool, with a long-term roadmap to cover all languages across our global business locations." />
          <StaticText id="p4-tool-para2" initialText="I defined product requirements, coordinated with engineering to scope and prioritize key features, provided curated training materials to enhance model accuracy, built and maintained glossary libraries to ensure brand language consistency, drafted and refined UI copy, conducted end-to-end user testing, and delivered actionable feedback for ongoing usability optimization." />
          <StaticText id="p4-tool-para3" initialText="This initiative significantly shortened translation turnaround time and improved terminology consistency, while strengthening my cross-functional collaboration and user-centric problem-solving abilities." />
        </div>
      </div>
    </div>
  </div>
);

const SkillShowcases = () => {
  const [activeMainTab, setActiveMainTab] = useState('editorial'); 
  const mainTabs = [
    { id: 'editorial', label: 'Editorial', icon: <Edit3 size={18} /> },
    { id: 'copywriting', label: 'Copywriting', icon: <Megaphone size={18} /> },
    { id: 'pr', label: 'PR & Communications', icon: <Globe size={18} /> },
    { id: 'transcreation', label: 'Transcreation', icon: <Languages size={18} /> }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMainTab(tab.id)}
            className={`flex items-center space-x-3 px-8 py-4 border-[0.5px] transition-all text-[10px] tracking-[0.2em] uppercase ${activeMainTab === tab.id ? 'bg-[#111111] text-white border-[#111111]' : 'bg-transparent text-[#8B8574] border-[#E5E2D9] hover:border-[#C5A059]'}`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[40vh]">
        {activeMainTab === 'editorial' && <EditorialShowcase />}
        {activeMainTab === 'copywriting' && <CopywritingShowcase />}
        {activeMainTab === 'pr' && <PRShowcase />}
        {activeMainTab === 'transcreation' && <TranscreationShowcase />}
      </div>
    </div>
  );
};

const EditorialShowcase = () => {
  const [selectedCat, setSelectedCat] = useState(EDITORIAL_CATEGORIES[0].id);
  const activeCategory = EDITORIAL_CATEGORIES.find(c => c.id === selectedCat);

  return (
    <div className="space-y-16">
      <div className="flex flex-wrap justify-center gap-6">
        {EDITORIAL_CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCat(cat.id)} className={`text-[10px] tracking-[0.2em] uppercase pb-2 transition-all ${selectedCat === cat.id ? 'text-[#C5A059] border-b border-[#C5A059] font-semibold' : 'text-[#8B8574] hover:text-[#111111]'}`}>
            {cat.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {activeCategory.samples.map((sample, idx) => (
          <div key={`${selectedCat}-${idx}`} className="group flex flex-col h-full bg-white border-[0.5px] border-[#E5E2D9] hover:border-[#C5A059] transition-all duration-500 overflow-hidden shadow-sm">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F8F4] flex items-center justify-center p-2">
              <img src={sample.img} alt={sample.title_en} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-6 flex flex-col flex-grow bg-white">
              <div className="mb-6">
                <StaticText id={`ed-en-${selectedCat}-${idx}`} className="text-[11px] font-bold tracking-wide text-[#111111] uppercase mb-2" initialText={sample.title_en} />
                <StaticText id={`ed-desc-en-${selectedCat}-${idx}`} className="text-[10px] leading-relaxed text-[#666666]" initialText={sample.desc_en} />
              </div>
              <div className="mb-6">
                <StaticText id={`ed-zh-${selectedCat}-${idx}`} className="text-[13px] font-serif text-[#C5A059] font-medium mb-2" initialText={sample.title_zh} />
                <StaticText id={`ed-desc-zh-${selectedCat}-${idx}`} className="text-[11px] leading-relaxed text-[#8B8574] font-serif" initialText={sample.desc_zh} />
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#F5F3ED] group-hover:text-[#C5A059] cursor-pointer" onClick={() => window.open(sample.link, '_blank')}>
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold">READ STORY</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CopywritingShowcase = () => (
  <div className="space-y-32 max-w-7xl mx-auto">
    {COPYWRITING_SAMPLES.map((sample, idx) => (
      <div key={idx} className="group border-b border-[#E5E2D9]/50 pb-32 last:border-0 last:pb-0">
        
        {sample.layout === 'device' && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-6 max-w-2xl">
              <div className="flex items-center justify-center space-x-3 text-[#C5A059] mb-4">
                {sample.icon}
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{sample.type}</span>
              </div>
              {!sample.hideText && sample.title && (
                <StaticText id={`copy-title-${idx}`} element="h4" className="font-serif text-4xl mb-4" initialText={sample.title} />
              )}
            </div>
            
            <DeviceCarousel images={sample.images} />
            
            {sample.cta && (
              <div className="mt-8 text-center">
                <a href={sample.link} target="_blank" className="inline-flex items-center space-x-3 group/btn">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-[#111111] group-hover/btn:text-[#C5A059] group-hover/btn:border-[#C5A059] transition-all pb-1">{sample.cta}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>
        )}

        {sample.layout === 'framed-gallery' && (
          <div className="flex flex-col">
            <div className="mb-12">
              <div className="flex items-center space-x-3 text-[#C5A059] mb-4">
                {sample.icon}
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{sample.type}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {sample.images.map((img, i) => (
                <div key={i} className="bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-[#E5E2D9] transform transition-transform duration-500 hover:-translate-y-4 hover:shadow-2xl">
                  <div className="min-h-[300px] flex items-center justify-center bg-[#F9F8F4] mb-4 p-2 overflow-hidden">
                    <img src={img} className="max-w-full max-h-full object-contain" alt="Gallery frame" />
                  </div>
                  <div className="text-center py-2 border-t border-[#F5F3ED]">
                    <span className="text-[8px] tracking-widest text-[#8B8574] uppercase">Plate 0{i+1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sample.layout === 'integrated-video' && (
          <div className="space-y-16">
            <div className="flex items-center space-x-3 text-[#C5A059]">
              {sample.icon}
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">{sample.type}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {sample.videos.map((vid) => (
                <div key={vid.id} className="group/vid flex flex-col items-center">
                  <div className="w-full max-w-[340px] aspect-[9/16] relative bg-black shadow-2xl rounded-xl overflow-hidden mb-8 group-hover/vid:scale-[1.02] transition-transform duration-500">
                    <img src={vid.poster} className="w-full h-full object-cover opacity-70" alt="Video poster" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a href={vid.link} target="_blank" className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-[#C5A059] transition-all">
                        <Play size={28} fill="currentColor" />
                      </a>
                    </div>
                  </div>
                  <div className="text-center space-y-3 px-4">
                    <h5 className="font-serif text-2xl">{vid.title}</h5>
                    <p className="text-[#C5A059] text-sm font-serif italic mb-2">{vid.headline}</p>
                    <div className="flex justify-center gap-2 pt-4">
                      {vid.platforms.map(p => (
                        <span key={p} className="text-[7px] font-bold border border-[#E5E2D9] px-2 py-1 rounded-sm text-[#8B8574]">{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

const PRShowcase = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-32">
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h4 className="font-serif text-3xl">Press Releases</h4>
          <p className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold">Press Release Localization</p>
        </div>
        <div className="space-y-32">
          {PR_RELEASES.map((pr) => (
            <div key={pr.id} className="group">
              <div className="flex flex-col md:flex-row justify-between items-end border-b border-[#E5E2D9] pb-8 mb-8 gap-4">
                <h5 className="font-serif text-2xl text-[#111111]">{pr.title}</h5>
                <a href={pr.link} target="_blank" className="flex items-center gap-3 px-8 py-3 bg-[#111111] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-[#C5A059] transition-all">
                  Read Full Release <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <span className="text-[9px] font-bold tracking-widest text-[#8B8574] uppercase block">English Version</span>
                  <div className="border border-[#E5E2D9] bg-white h-[400px] lg:h-[500px]">
                    <img src={pr.imgEN} className="w-full h-full object-contain" alt={`${pr.title} EN`} />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <span className="text-[9px] font-bold tracking-widest text-[#C5A059] uppercase block">中文新闻稿</span>
                  <div className="border border-[#E5E2D9] bg-white h-[400px] lg:h-[500px]">
                    <img src={pr.imgCN} className="w-full h-full object-contain" alt={`${pr.title} CN`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h4 className="font-serif text-3xl">Media Clips</h4>
          <p className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-bold">Coverage Highlights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {MEDIA_CLIPS.map((clip, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer relative flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(197,160,89,0.15)] transition-all duration-700 rounded-lg"
              onClick={() => window.open(clip.link, '_blank')}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#FDFBF7]">
                <img 
                  src={clip.img} 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                  alt={clip.title} 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h5 className="text-white font-serif text-xl mb-2">{clip.title}</h5>
                  <div className="flex items-center space-x-2 text-[#C5A059] font-bold text-[8px] tracking-[0.2em] uppercase">
                    <span>VIEW COVERAGE</span>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-[#F5F3ED] bg-white group-hover:bg-[#FDFBF7] transition-colors">
                 <span className="text-[9px] font-bold tracking-widest text-[#8B8574] group-hover:text-[#C5A059] uppercase transition-colors">{clip.title}</span>
                 <ExternalLink size={12} className="text-[#E5E2D9] group-hover:text-[#C5A059] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const TranscreationShowcase = () => {
  const voiceOvers = {
    corporate: [
      {
        id: "vo-corp-1",
        title: "Christie’s Art Finance",
        videoUrl: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/202604222023.mp4",
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/art%20finance.png", 
        en: "At Christie's, we recognize that a collection is never static. Christie's Art Finance offers discreet, tailor-made lending that enables collectors to access the value of their holdings with speed and confidence whether to invest in a new venture, settle estate affairs or make that next meaningful acquisition. Our approach is an elegant alternative to conventional lending. We move with agility and care. Guided not just by market metrics, but by a deep, nuanced understanding of what gives art its lasting worth. With expertise that spans over 70 categories, our global team brings centuries of insight. Most loans close within weeks, not months. From initial consultation, our global experts navigate every complexity, through due diligence, customs, licensing, multi-currency lending and disbursement ensuring every step is seamless. In our hands, your art is more than a collection of assets.",
        zh: "佳士得深知藝術收藏絕非一成不變。佳士得藝術融資服務提供私密的定制化融資方案，助藏家將心愛珍藏變為寶貴資產，全程高效、姿態從容。無論是投資新事業、處理遺產事宜、或是購藏下一件心儀之作，我們的服務皆為傳統借貸之外的雅緻之選。我們行事敏捷審慎，不僅依靠市場數據支持，更深諳藝術恆久價值之道。佳士得全球團隊覆蓋逾70個藝術及精品類別，積澱數百年行業洞見。多數融資方案數周內即可審批發放。自初步洽談起，佳士得專家就將全程為您護航。從盡職調查、海關事務、資質許可，到多幣種借貸及款項撥付，確保每一步都順暢無忧。在佳士得，您的藝術珍藏遠非一紙資產清單。"
      },
      {
        id: "vo-corp-2",
        title: "Christie’s Restitution",
        videoUrl: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/refi2.mp4",
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/restitution.png", 
        en: "At Christie's, provenance research is a careful practice that traces the ownership history of an object. It is at the heart of our commitment to restitution. We've assembled the largest and most experienced restitution team of any global auction house. Specialized in provenance research of the Nazi era, our team strives to illuminate the complex history of an object to uncover its ownership history and, when needed, to facilitate amicable resolutions. We partner with sellers, claimants, lawyers, and nonprofit organizations, leveraging our international reach to prevent the circulation of looted objects in the art market. We advocate for the fair and just resolution of claims. Stewardship means not just handling objects well but honoring the histories they carry.",
        zh: "在佳士得，我們向來以嚴謹態度研究拍品來源，縝密追溯每件藝術品的流傳脈絡。這正是我們履行藝術品歸還承諾的核心所在。我們的藝術品歸還團隊無論从规模还是经验而言，都堪称所有国际拍卖行之首。团队专精纳粹时期艺术品追溯研究，致力釐親器物背後盤根錯節的歷史脉絡，還原其所有權轉移史，並在需要時推动善意和解方式。我們與委託方、所有權聲請人、律師及非營利組織通力合作，憑藉全球網絡優勢，遏制劫掠文物在藝術市場流通。我們始終倡導以公正原則解決藝術品歸還爭議。文物保護不僅意味著妥善保管每件藏品，更在於對其承載的歷史記憶保有敬畏之心。"
      }
    ],
    social: [
      {
        id: "vo-social-1",
        title: "Christie’s 2025 Year in Review",
        videoUrl: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/thx%20endd.mp4", 
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/%E5%B9%B4%E5%BA%A6%E5%9B%9E%E9%A1%BE.png",
        en: `HERE AT CHRISTIE’S\nA SINGLE YEAR CONTAINS THE SWEEP OF HISTORY\nFROM THE SMALL BUT SIGNIFICANT\nTO WORKS OF A VERY DIFFERENT SCALE\nFRAGILE\nFAST\nFUNNY\nUNUSUAL\nVINTAGE\nRARE\nTRUE ICONS OF CULTURE\n2025 HAS BEEN DEFINED BY EXTRAORDINARY MOMENTS\nWE CARE DEEPLY ABOUT EACH ONE\nAND HOW WE CELEBRATE THEM\nEVERY PIECE AND EVERY PERSON SHAPES THE STORY OF THE YEAR\nWE COULDN’T HAVE DONE IT WITHOUT YOU`,
        zh: `佳士得年度回顾\n荟萃古今 包罗万象\n玲珑臻品 蕴藏非凡\n磅礴巨作 撼动心魂\n瑰丽如诗\n疾速如风\n妙趣横生\n独树一帜\n经典隽永\n传世罕有\n当代文化传奇\n2025因无数非凡时刻而熠熠生辉\n我们由衷珍视每一瞬光芒\n更以敬意镌刻每一段记忆\n华彩篇章由每一件藏品、每一位知己共同谱写\n所有成就，皆因有您\n谨以此片，致谢厚爱`
      },
      {
        id: "vo-social-2",
        title: "Teaser",
        videoUrl: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/dianlan.mp4", 
        poster: "https://raw.githubusercontent.com/lizzyli1856-blip/coding/main/dinalanruohua.png",
        en: `An inner wish to cultivate the literati mind\nand an outward connection to nature, order and harmony\nThe consolidation of authoritative power\nA portrait of strength that defines a dynasty\nThe hallmark of a great empire:\nProsperity, stability\nLongevity`,
        zh: `內求文心修養\n外彰自然和諧之韻 \n皇權一統彰顯威儀\n剛健氣度王朝風範\n泱泱大國之吉象\n豐饒盛世海宇承平\n國祚綿長`
      }
    ]
  };

  const reports = [
    {
      id: "rep-1",
      title: "Business Proposals",
      link: "https://issuu.com/docs/27f218e0430465603f382463e523b394?fr=sMWU5NDg4Njg5NTk"
    },
    {
      id: "rep-2",
      title: "Art Market Reports",
      link: "https://mp.weixin.qq.com/s/S5RhW6qHp7ZuR1lhG7QWTg"
    },
    {
      id: "rep-3",
      title: "Luxury Market Report",
      link: "https://www.christies.com/hk/pdf/2025/Christies_Jewels_Market_Report_2025_CN.pdf"
    }
  ];

  return (
    <div className="space-y-32">
      <section className="space-y-16">
        <div className="flex items-center space-x-4 border-b border-[#E5E2D9] pb-6">
          <Mic className="text-[#C5A059]" size={24} />
          <h4 className="font-serif text-3xl">Creative Voice-Over Transcreation</h4>
        </div>
        
        <div className="space-y-12">
          <h5 className="text-[10px] tracking-[0.3em] text-[#8B8574] uppercase font-bold px-2">Corporate Narratives</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {voiceOvers.corporate.map((vid) => (
              <div key={vid.id} className="space-y-6">
                <div className="aspect-video bg-black rounded shadow-sm overflow-hidden">
                  <video className="w-full h-full object-cover" controls src={vid.videoUrl} poster={vid.poster} />
                </div>
                <div className="bg-[#F9F8F4] p-6 border border-[#E5E2D9] h-[400px] overflow-y-auto">
                  <StaticText id={`vo-title-${vid.id}`} element="h5" className="font-serif text-lg border-b border-[#E5E2D9] pb-2 mb-4" initialText={vid.title} />
                  <div className="space-y-6">
                    <div>
                      <span className="text-[8px] font-bold text-[#8B8574] uppercase block mb-2">Original Script</span>
                      <StaticText id={`vo-en-${vid.id}`} className="text-[10px] leading-relaxed text-[#444444]" initialText={vid.en} />
                    </div>
                    <div className="pt-4 border-t border-[#E5E2D9]/50">
                      <span className="text-[8px] font-bold text-[#C5A059] uppercase block mb-2">Chinese Transcreation</span>
                      <StaticText id={`vo-zh-${vid.id}`} className="text-[11px] font-serif leading-relaxed" initialText={vid.zh} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12 pt-12 border-t border-[#E5E2D9]/30">
          <h5 className="text-[10px] tracking-[0.3em] text-[#8B8574] uppercase font-bold px-2">Social Media</h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {voiceOvers.social.map((vid) => (
              <div key={vid.id} className="space-y-6">
                <div className="aspect-video bg-black rounded shadow-sm overflow-hidden">
                  {vid.videoUrl ? (
                    <video className="w-full h-full object-cover" controls src={vid.videoUrl} poster={vid.poster} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 bg-neutral-900">
                      <Film size={48} />
                    </div>
                  )}
                </div>
                <div className="bg-[#F9F8F4] p-6 border border-[#E5E2D9] h-[400px] overflow-y-auto">
                  <StaticText id={`vo-title-${vid.id}`} element="h5" className="font-serif text-lg border-b border-[#E5E2D9] pb-2 mb-4" initialText={vid.title} />
                  <div className="space-y-6">
                    <div>
                      <span className="text-[8px] font-bold text-[#8B8574] uppercase block mb-2">Original Script</span>
                      <StaticText id={`vo-en-${vid.id}`} className="text-[10px] leading-relaxed text-[#444444]" initialText={vid.en} />
                    </div>
                    <div className="pt-4 border-t border-[#E5E2D9]/50">
                      <span className="text-[8px] font-bold text-[#C5A059] uppercase block mb-2">Chinese Transcreation</span>
                      <StaticText id={`vo-zh-${vid.id}`} className="text-[11px] font-serif leading-relaxed" initialText={vid.zh} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-16 pt-16 border-t border-[#E5E2D9]/50">
        <div className="flex items-center space-x-4 border-b border-[#E5E2D9] pb-6">
          <FileText className="text-[#C5A059]" size={24} />
          <h4 className="font-serif text-3xl">Market Report Localization</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report) => (
            <div key={report.id} className="group flex flex-col justify-between bg-white border border-[#E5E2D9] p-8 hover:border-[#C5A059] transition-all duration-500 hover:shadow-xl">
              <div className="space-y-4">
                <h5 className="font-serif text-xl">{report.title}</h5>
              </div>
              <div className="mt-12">
                <a href={report.link} target="_blank" className="inline-flex items-center space-x-2 text-[#111111] hover:text-[#C5A059] transition-all group/link">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-[#111111] group-hover/link:border-[#C5A059] pb-1">View Full Report</span>
                  <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const AboutView = ({ profileImg }) => (
  <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
    <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full mb-16">
      <img src={profileImg} alt="Lizzy Li" className="w-full h-full object-cover" />
    </div>
    <div className="text-center max-w-4xl mb-24">
      <StaticText 
        id="about-intro"
        className="font-light leading-relaxed text-2xl md:text-3xl font-serif text-[#111111]"
        initialText="I am a strategic storyteller with a curator’s eye and a growth-focused mindset. Working at the intersection of content creation, public relations, and creative direction, I help brands translate heritage into meaningful growth."
      />
    </div>
    <div className="bg-white border border-[#E5E2D9] p-10 md:p-16 relative overflow-hidden shadow-sm w-full mb-16">
       <div className="relative z-10">
          <h3 className="font-serif text-4xl mb-8">What I Bring</h3>
          <StaticText 
            id="about-details"
            className="text-[#444444] leading-loose text-lg font-light text-justify"
            initialText="I have built expertise in the art and luxury sector since 2024, progressing from an intern to an officer role within Christie’s Content & Communications team. My experience across art and luxury has afforded me a cross-category perspective that informs cross-channel content strategy aimed at elevating brand desirability and driving commercial performance. Having supported high-profile brand collaborations and integrated content strategies, I create clear, brand-aligned narratives that bridge commercial objectives with elegant communication."
          />
       </div>
    </div>

    <div className="w-full max-w-3xl pt-8 pb-24 text-center">
      <h3 className="text-[10px] tracking-[0.4em] text-[#8B8574] uppercase font-bold mb-10">Core competencies</h3>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {[
          "Brand Storytelling",
          "Content Strategy",
          "Public Relations",
          "Cross-Cultural Communication"
        ].map((skill) => (
          <div key={skill} className="px-6 py-2 border border-[#C5A059]/30 text-[#C5A059] text-[10px] tracking-widest uppercase rounded-full bg-[#C5A059]/5">
            {skill}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactView = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
    <FadeIn delay={0.2}>
      <h2 className="text-3xl font-serif mb-8">Get In Touch</h2>
      <StaticText 
        id="contact-email"
        className="text-lg tracking-widest border-b border-[#111111] pb-1 uppercase mb-24 inline-block"
        initialText="lizzyli1856@gmail.com"
      />
    </FadeIn>
  </div>
);
