// =====================================================================
//  이 파일만 수정하면 홈페이지 내용이 바뀝니다.
//  - 문자열 안에 HTML(<a>, <b> 등)을 그대로 쓸 수 있습니다.
//  - 이미지/영상/PDF 파일은 img/, gif/, video/, files/ 폴더에 넣고 경로를 적으세요.
// =====================================================================

window.SITE = {
  // ---------------------------------------------------------------
  // 프로필
  // ---------------------------------------------------------------
  profile: {
    name: "Gyeongrak (GR) Choe",
    // 논문 저자 목록에서 굵게+밑줄 처리할 이름 표기들
    selfNames: ["G. Choe", "Gyeongrak Choe"],
    photo: "img/profile2-web.jpg",
    position: [
      "M.S. Student, Integrated M.S./Ph.D. Program",
      'Interdisciplinary Program in Artificial Intelligence, Seoul National University',
      '<a href="https://larr.snu.ac.kr/">Lab for Autonomous Robotics Research (LARR)</a>',
      'Contact: <a href="mailto:rudfkr5978@snu.ac.kr">rudfkr5978@snu.ac.kr</a>',
    ],
    // icon: email | cv | lab | scholar | github | linkedin | x | youtube
    links: [
      { icon: "lab",      label: "Lab",      url: "https://larr.snu.ac.kr/" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/gyeongrak-choe-816851371/" },
      { icon: "github",   label: "GitHub",   url: "https://github.com/Gyeong-Rak" },
      // { icon: "cv",      label: "Curriculum Vitae", url: "files/cv.pdf" },
      // { icon: "scholar", label: "Google Scholar",   url: "https://scholar.google.com/..." },
    ],
  },

  // ---------------------------------------------------------------
  // 자기소개 (문단 단위 배열)
  // ---------------------------------------------------------------
  bio: [
    'I am an M.S. student in the integrated M.S./Ph.D. program of the Interdisciplinary Program in Artificial Intelligence at Seoul National University, where I work in the <a href="https://larr.snu.ac.kr/">Lab for Autonomous Robotics Research (LARR)</a> under the supervision of Prof. <a href="https://larr.snu.ac.kr/">H. Jin Kim</a>. I received the B.S. degree in Aerospace Engineering from Seoul National University in 2026, and spent Autumn 2025 as an exchange student at the <a href="https://www.washington.edu/">University of Washington</a>.',
    "Before graduate school, I served in the Republic of Korea Army as a CH-47D Chinook crew member, logging over 100 flight hours. As an undergraduate, I was a member of BullNaBi, the drone research club at SNU, and competed in the AIAA Design/Build/Fly competition.",
    "My research interests lie in <b>reinforcement learning</b> and <b>computer vision</b> for robotics, with a particular interest in <b>humanoid robots</b>.",
  ],

  // ---------------------------------------------------------------
  // 뉴스 (최신순). newsVisible 개수만 기본으로 보이고 나머지는 "Show more"
  // ---------------------------------------------------------------
  newsVisible: 5,
  news: [
    { date: "Mar. 2026", text: 'Started the integrated M.S./Ph.D. program in the Interdisciplinary Program in Artificial Intelligence at Seoul National University and joined <a href="https://larr.snu.ac.kr/">LARR</a>.' },
    { date: "Feb. 2026", text: "Received the B.S. degree in Aerospace Engineering from Seoul National University." },
    { date: "Sep. 2025", text: 'Began an exchange semester at the <a href="https://www.washington.edu/">University of Washington</a>.' },
    { date: "Jul. 2025", text: 'Served as a lead IT instructor in Karakol, Kyrgyzstan, through the <a href="https://www.nia.or.kr/">NIA</a> global ICT volunteer program.' },
    { date: "Apr. 2025", text: 'Competed in the <a href="https://www.aiaa.org/dbf">AIAA Design/Build/Fly</a> competition in Tucson, Arizona.' },
    { date: "Jan. 2023", text: "Completed military service as a CH-47D crew member in the Republic of Korea Army." },
  ],

  // ---------------------------------------------------------------
  // 논문 (최신순). 비워두면 ( publications: [] ) 섹션이 사라집니다.
  //  media     : 썸네일. .png/.jpg/.gif는 이미지(클릭 시 확대), .mp4/.webm은 자동재생 영상
  //  poster    : (영상일 때) 로드 전에 보여줄 이미지
  //  authors   : 저자 배열. 문자열 또는 { name, url }. selfNames와 일치하면 자동 강조
  //  featured  : true면 대표 논문으로 노란 배경 하이라이트
  //  note      : 저자 아래 작은 주석 (예: "* equal contribution")
  //  award     : 수상 내역 (빨간 글씨)
  //  links     : 논문/프로젝트 페이지/코드 등
  //
  //  예시:
  //  {
  //    title: "Paper Title",
  //    authors: [{ name: "G. Choe" }, "A. Author", { name: "H. J. Kim", url: "https://larr.snu.ac.kr/" }],
  //    venue: "IEEE Robotics and Automation Letters (RA-L)", year: 2027,
  //    media: "img/paper1.png", featured: true,
  //    links: [{ label: "Paper", url: "https://arxiv.org/abs/..." }],
  //  },
  // ---------------------------------------------------------------
  publicationNote: "* equal contribution &nbsp;/&nbsp; highlighted rows indicate representative papers",
  publications: [
    {
      title: "Fly-by-Code: Embodied Coding Agents for Aerial Manipulation with Active Visual and Physical Feedback",
      authors: [
        "J. Lee*", "J. Seo*", "S. Cho*", { name: "G. Choe" },
        "Y. Wang", "B. Saravanan",
        { name: "J.-B. Huang", url: "https://jbhuang0604.github.io/" },
        { name: "F. Huang", url: "https://furong-huang.com/" },
        { name: "S. Scherer", url: "https://theairlab.org/team/sebastian/" },
        { name: "G. Shi", url: "https://www.gshi.me/" },
        { name: "H. J. Kim", url: "https://larr.snu.ac.kr/" },
        "S. Lee",
        { name: "D. Lee", url: "https://dongjaelee95.github.io/" },
      ],
      venue: "Preprint",
      year: 2026,
      media: "video/flybycode_teaser.mp4",
      poster: "img/flybycode_poster.jpg",
      featured: true,
      links: [
        { label: "Website", url: "https://fly-by-code.github.io/" },
        { label: "Video", url: "video/real_cabinet_film_v12_labels_20261008.mp4" },
      ],
    },
  ],

  // ---------------------------------------------------------------
  // 프로젝트 / 경력. 비워두면 섹션이 사라집니다.
  //  media      : 썸네일 (16:9로 잘려 보이고, 클릭하면 원본 전체가 보임)
  //  mediaFocus : 잘릴 때 보여줄 위치 "가로% 세로%" (기본은 가운데)
  // ---------------------------------------------------------------
  projectsTitle: "Projects &amp; Experience",
  projects: [
    {
      title: "AIAA Design/Build/Fly Competition – Sizing &amp; Mission Analysis",
      period: "Oct. 2024 – Apr. 2025 &nbsp;·&nbsp; Seoul, Korea / Tucson, Arizona",
      description: "Developed an automated fixed-wing aircraft sizing and optimization tool to maximize the competition score. Integrated OpenVSP, VSPAERO, and ANSYS Fluent through Python APIs to automate geometry generation and aerodynamic coefficient calculation, using CFD results to correct for VSPAERO's inviscid-flow limitations. Built a mission simulation based on 6-DOF fixed-wing equations of motion and a grid-search optimizer over geometric parameters and mission throttle settings.",
      media: "img/AIAADBF.jpeg",
      mediaFocus: "50% 55%",
      links: [{ label: "AIAA DBF", url: "https://www.aiaa.org/dbf" }],
    },
    {
      title: "Global ICT Volunteer – Lead IT Instructor",
      period: "Jul. 2025 – Aug. 2025 &nbsp;·&nbsp; Karakol, Kyrgyzstan",
      description: "Led a 3-week education program organized by the National Information Society Agency (NIA). Designed and taught a curriculum on Python programming, AI fundamentals (gradient descent, KNN, neural network classification), and multirotor control with both remote controllers and Python-based autonomous commands.",
      media: "img/GlobalICTVolunteer.jpeg",
    },
    {
      title: "CH-47D Chinook Crew Member, Republic of Korea Army",
      period: "Jul. 2021 – Jan. 2023 &nbsp;·&nbsp; Icheon, Korea",
      description: "Accumulated over 100 flight hours providing flight assistance and situational awareness to pilots, and performed routine maintenance and inspections for missions including wildfire suppression and military supply transport.",
      media: "img/CH-47D.jpeg",
      mediaFocus: "50% 75%",
    },
  ],

  // ---------------------------------------------------------------
  // 학력 (최신순). 비워두면 섹션이 사라집니다.
  //  logo    : 학교 로고 (img/logos/)
  //  details : 학위 아래 추가 줄들 (지도교수, 연구실, 동아리 등)
  // ---------------------------------------------------------------
  education: [
    {
      degree: "M.S. in Artificial Intelligence (Integrated M.S./Ph.D. Program)",
      school: 'Interdisciplinary Program in Artificial Intelligence, Seoul National University',
      period: "Mar. 2026 – Present",
      logo: "img/logos/snu.png",
      details: [
        'Advisor: <a href="https://larr.snu.ac.kr/">Prof. H. Jin Kim</a>, Lab for Autonomous Robotics Research (LARR)',
      ],
    },
    {
      degree: "Exchange Student",
      school: "University of Washington, Seattle",
      period: "Autumn 2025",
      logo: "img/logos/uw.svg",
    },
    {
      degree: "B.S. in Aerospace Engineering",
      school: "Seoul National University",
      period: "Mar. 2020 – Feb. 2026",
      logo: "img/logos/snu.png",
      details: ["BullNaBi (Drone Research Club)"],
    },
  ],

  // 페이지 맨 아래 "Last updated" 날짜
  lastUpdated: "Oct 8, 2026",
};
