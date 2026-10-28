export interface ChapterCopy {
  id: string
  kind: string
  alt: string
  index: string
  scene: string
  record: boolean
  overline: string
  title: string
  body: string
  detail: string
  tags: string
  bars?: boolean
}

export interface CinemaCopy {
  skip: string
  nav: {
    home: string
    vision: string
    production: string
    creators: string
    essence: string
    menu: string
    open: string
    close: string
    primary: string
  }
  opening: {
    eyebrow: string
    tagline: string
    scroll: string
    portalKicker: string
    portalTitle: string
    portalNote: string
    frameLeft: string
    frameRight: string
  }
  vision: {
    eyebrow: string
    title: string
    body: string
    aside: string
  }
  intro: { kicker: string; line: string; hint: string }
  chapters: {
    cinema: ChapterCopy
    ad: ChapterCopy
    creators: ChapterCopy
    training: ChapterCopy
    music: ChapterCopy
    atelier: ChapterCopy
    fashion: ChapterCopy
  }
  breathers: { scene: string; emotion: string; frequency: string }
  commitment: {
    left: string
    right: string
    title: string
    body: string
    items: { kicker: string; title: string; body: string }[]
  }
  services: {
    kicker: string
    title: string
    body: string
    listLabel: string
    items: { num: string; title: string; points: string[] }[]
    note: string
    noteBody: string
    cta: string
  }
  interludes: {
    creators: {
      label: string
      left: string
      right: string
      kicker: string
      title: string
      body: string
      bottom: string
      next: string
    }
    fashion: {
      label: string
      left: string
      right: string
      kicker: string
      title: string
      body: string
      bottom: string
      next: string
    }
  }
  workflow: {
    alt: string
    eyebrow: string
    title: string
    lead: string
    steps: { num: string; title: string; body: string }[]
  }
  intercut: {
    left: string
    right: string
    title: string
    label: string
    frames: { num: string; label: string }[]
    body: string
  }
  manifesto: {
    left: string
    right: string
    title: string
    body: string
    sign: string
  }
  connection: {
    label: string
    alt: string
    topLeft: string
    topRight: string
    nodes: string[]
    core: string
    stories: { kicker: string; title: string; body: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    body: string
    cta: string
    aside: string
  }
  footer: { line: string; universe: string; note: string }
}

const es: CinemaCopy = {
  skip: 'Saltar al contenido',
  nav: {
    home: 'KIZVNA, inicio',
    vision: 'La visión',
    production: 'Producción',
    creators: 'Creadores',
    essence: 'Nuestra esencia',
    menu: 'MENÚ',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    primary: 'Navegación principal'
  },
  opening: {
    eyebrow: 'KIZVNA / CONTENT · CULTURE · CONNECTION',
    tagline: 'Ideas que conectan.\n*Contenido que se siente.*',
    scroll: 'DESCUBRE NUESTRO UNIVERSO',
    portalKicker: 'LO QUE NOS UNE',
    portalTitle: 'Detrás de cada historia\n*hay una conexión real.*',
    portalNote: 'KIZVNA / THE CONNECTION',
    frameLeft: 'KIZVNA / FRAME 001',
    frameRight: 'CREATIVE PRODUCTION / EST. IN CONNECTION'
  },
  vision: {
    eyebrow: '01 / EL PUNTO DE PARTIDA',
    title: 'La próxima historia\npuede empezar\n*en una pantalla pequeña.*',
    body: 'KIZVNA nace de la música y de kizuna: los vínculos que nos unen. Queremos llevar esa conexión a videos, campañas, creadores, experiencias de aprendizaje y cultura urbana. Pensamos en grande sin perder lo auténtico.',
    aside: '01 — 07\nEXPLORA EL UNIVERSO ↓'
  },
  intro: {
    kicker: 'EL UNIVERSO KIZVNA',
    line: 'Una idea. Muchos mundos. Una conexión.',
    hint: 'DESLIZA PARA ENTRAR ↓'
  },
  chapters: {
    cinema: {
      id: 'cine',
      kind: 'chapter-cinema',
      alt: 'Directora creativa negra coordinando una grabación con cámara mirrorless y equipo de producción diverso',
      index: '01 / CONTENIDO AUDIOVISUAL',
      scene: 'CREATOR SET / REC',
      record: true,
      overline: 'PRODUCCIÓN CON INTENCIÓN',
      title: 'Una idea.\n*Mil formas de verla.*',
      body: 'Reels, campañas, videoclips y contenido de marca. Equipos ágiles, mirada creativa y producción profesional hecha para las pantallas de hoy.',
      detail: 'DE LA IDEA AL CONTENIDO',
      tags: 'Concepto · Grabación · Edición · Shorts · Reels · Video social'
    },
    ad: {
      id: 'publicidad',
      kind: 'chapter-ad',
      alt: 'Set de producción de un comercial de producto con iluminación de estudio y equipo técnico',
      index: '02 / PUBLICIDAD Y CAMPAÑAS',
      scene: 'BEHIND THE CONCEPT',
      record: true,
      overline: 'EL CONCEPTO EN MOVIMIENTO',
      title: 'Ideas que\n*se vuelven impacto.*',
      body: 'Desde el concepto hasta la ejecución: comerciales y campañas pensadas para construir identidad, provocar emociones y abrir conversaciones.',
      detail: 'DEL BRIEF A LA IMAGEN',
      tags: 'Concepto · Dirección de arte · Producción comercial · Campañas'
    },
    creators: {
      id: 'creadores',
      kind: 'chapter-influencer',
      alt: 'Equipo de influencers y creativos preparando una campaña para redes sociales en un estudio',
      index: '03 / CREADORES E INFLUENCERS',
      scene: 'CREATOR CULTURE / LIVE',
      record: true,
      overline: 'PERSONAS ANTES QUE NÚMEROS',
      title: 'La influencia\n*nace de conectar.*',
      body: 'Imaginamos un espacio donde talentos, marcas y comunidades construyan colaboraciones reales. Representación, dirección creativa y campañas con personalidad.',
      detail: 'CREATOR UNIVERSE',
      tags: 'Desarrollo de talento · Campañas con creadores · Producción · Comunidad'
    },
    training: {
      id: 'formacion',
      kind: 'chapter-training',
      alt: 'Mentor enseñando a creadores a utilizar cámara profesional y luz durante taller práctico',
      index: '04 / FORMACIÓN Y CAPACITACIONES',
      scene: 'SHARE THE KNOW-HOW',
      record: false,
      overline: 'EL TALENTO TAMBIÉN SE CULTIVA',
      title: 'Aprender.\n*Crear. Compartir.*',
      body: 'Queremos abrir espacios para aprender producción, creación de contenido, narrativa y marca personal. Compartir conocimiento también crea vínculos.',
      detail: 'APRENDER HACIENDO',
      tags: 'Talleres · Mentorías · Formación para creadores · Práctica audiovisual'
    },
    music: {
      id: 'musica',
      kind: 'chapter-music',
      alt: 'Cantante negra grabando música mientras productor negro trabaja en consola analógica',
      index: '05 / MÚSICA Y UNIVERSO SONORO',
      scene: 'REC SESSION',
      record: true,
      overline: 'DONDE TODO COMENZÓ',
      title: 'Primero\n*lo sentimos.*',
      body: 'Nuestra raíz está en la música. En el estudio, en las voces y en las historias que merecen un sonido y una identidad propios.',
      detail: 'EL SONIDO DE UNA IDENTIDAD',
      tags: 'Producción musical · Identidad artística · Dirección visual · Contenido',
      bars: true
    },
    atelier: {
      id: 'moda',
      kind: 'chapter-atelier',
      alt: 'Diseñador de ropa urbana confeccionando una chaqueta en taller de costura',
      index: '06 / MODA — EL PROCESO',
      scene: 'DESIGN LAB / WORK IN PROGRESS',
      record: false,
      overline: 'LA CULTURA TAMBIÉN SE VISTE',
      title: 'De la idea\n*a una identidad.*',
      body: 'Streetwear, diseño experimental, sastrería contemporánea y nuevas siluetas. Cada prenda puede convertirse en una forma de expresión.',
      detail: 'DE LA FORMA AL SENTIDO',
      tags: 'Concepto visual · Styling · Dirección de arte · Narrativa editorial'
    },
    fashion: {
      id: 'editorial',
      kind: 'chapter-fashion',
      alt: 'Modelo con ropa urbana posando ante cámaras durante campaña streetwear',
      index: '07 / MODA — LA EXPRESIÓN',
      scene: 'EDITORIAL / LIGHTS ON',
      record: true,
      overline: 'DEL TALLER A LA CAMPAÑA',
      title: 'Una actitud.\n*Todo un universo.*',
      body: 'La moda dialoga con la música, el arte, la cultura y las personas. Cada estética tiene una historia y un lugar en el universo KIZVNA.',
      detail: 'LA HISTORIA EN SU MÁXIMA EXPRESIÓN',
      tags: 'Editoriales · Fashion films · Fotografía · Producción de moda'
    }
  },
  breathers: {
    scene: '01 / CAMBIO DE ESCENA\nLa diferencia está\nen *cómo lo contamos.*',
    emotion:
      '02 / NUEVO ESCENARIO\nLa atención dura segundos.\n*La emoción permanece.*',
    frequency:
      '05 / CAMBIO DE FRECUENCIA\nUna canción puede durar minutos.\n*Su historia, toda una vida.*'
  },
  commitment: {
    left: 'LO QUE NOS DEFINE / NUESTROS PRINCIPIOS',
    right: 'TRABAJO CON INTENCIÓN',
    title: 'Una gran idea merece\n*un gran cuidado.*',
    body: 'El talento importa. Pero la forma de trabajar determina lo que una historia puede llegar a ser. Estos son los principios con los que queremos construir cada colaboración.',
    items: [
      {
        kicker: '01 / ESCUCHAMOS',
        title: 'Primero entendemos.',
        body: 'Antes de grabar, buscamos comprender la identidad, los objetivos, las personas y el mensaje detrás del proyecto. La dirección empieza con una buena conversación.'
      },
      {
        kicker: '02 / RESPETAMOS',
        title: 'El talento y la confianza.',
        body: 'Valoramos el tiempo, las ideas y el trabajo de cada persona involucrada. Colaborar exige comunicación clara, respeto por la diversidad y acuerdos transparentes.'
      },
      {
        kicker: '03 / CUIDAMOS',
        title: 'Cada decisión creativa.',
        body: 'Un buen resultado nace de la preparación: referencias, guion, planificación, ejecución, edición y revisión. Nos importa tanto el proceso como lo que aparece en pantalla.'
      },
      {
        kicker: '04 / EVOLUCIONAMOS',
        title: 'Aprendemos para ir más lejos.',
        body: 'La cultura, la tecnología y las plataformas cambian. Queremos experimentar, aprender y perfeccionar los formatos sin perder autenticidad.'
      }
    ]
  },
  services: {
    kicker: 'ESPECIALIDADES / LO QUE PODEMOS CREAR CONTIGO',
    title: 'El equipo para\n*darle vida a tu idea.*',
    body: 'Cada proyecto es diferente. Podemos pensar la historia, diseñar su universo y producir los formatos que necesite. Estas son las líneas que articulan la visión de KIZVNA.',
    listLabel: 'Seis especialidades de KIZVNA',
    items: [
      {
        num: '01 / VIDEO & SOCIAL',
        title: 'Contenido para redes.',
        points: [
          'Concepto, guion y dirección creativa.',
          'Reels, TikTok, Shorts y contenido de producto.',
          'Grabación, edición y adaptación a cada plataforma.'
        ]
      },
      {
        num: '02 / CAMPAIGNS',
        title: 'Publicidad y comerciales.',
        points: [
          'Conceptos publicitarios con identidad.',
          'Dirección de arte, preproducción y realización.',
          'Campañas adaptadas a diferentes formatos.'
        ]
      },
      {
        num: '03 / CREATOR CULTURE',
        title: 'Creadores y colaboraciones.',
        points: [
          'Campañas y contenido con creadores.',
          'Dirección creativa de talento.',
          'Representación como línea de crecimiento.'
        ]
      },
      {
        num: '04 / SOUND',
        title: 'Música e identidad artística.',
        points: [
          'Desarrollo creativo de proyectos musicales.',
          'Videoclips, sesiones y contenido visual.',
          'Una identidad que conecte imagen y sonido.'
        ]
      },
      {
        num: '05 / FASHION',
        title: 'Moda y dirección editorial.',
        points: [
          'Concepto, styling y dirección de arte.',
          'Fotografía, lookbooks y fashion films.',
          'Estéticas urbanas y experimentales.'
        ]
      },
      {
        num: '06 / LEARN',
        title: 'Formación y capacitaciones.',
        points: [
          'Talleres prácticos de creación de contenido.',
          'Lenguaje audiovisual y presencia en cámara.',
          'Marca personal y habilidades digitales como visión de expansión.'
        ]
      }
    ],
    note: 'EL ALCANCE SE DEFINE CONTIGO',
    noteBody:
      'No todos los proyectos necesitan todo. Construimos una propuesta alrededor de tus objetivos y los recursos adecuados.',
    cta: 'CONVERSAR SOBRE MI PROYECTO ↗'
  },
  interludes: {
    creators: {
      label: 'De la creación al aprendizaje',
      left: 'KIZVNA / DEL TALENTO A LA COMUNIDAD',
      right: '03 → 04',
      kicker: 'LAS IDEAS CRECEN CUANDO CIRCULAN',
      title: 'Crear nos conecta.\n*Compartir nos lleva más lejos.*',
      body: 'Una historia puede inspirar a miles. El conocimiento detrás de esa historia puede impulsar a quienes crearán la siguiente.',
      bottom: 'DETRÁS DE CADA CREADOR HAY ALGO QUE APRENDER',
      next: 'CONTINÚA ↓'
    },
    fashion: {
      label: 'Del diseño a la expresión editorial',
      left: 'KIZVNA / DE LA FORMA A LA ACTITUD',
      right: '06 → 07',
      kicker: 'CADA DETALLE CUENTA UNA HISTORIA',
      title: 'Una prenda toma forma.\n*Una mirada la convierte en cultura.*',
      body: 'Del taller al lente, del material al movimiento: la identidad cobra vida cuando alguien la hace suya.',
      bottom: 'DEL PROCESO A LA EXPRESIÓN',
      next: 'CONTINÚA ↓'
    }
  },
  workflow: {
    alt: 'Equipo multicultural de producción planificando una grabación y revisando equipo audiovisual',
    eyebrow: 'DE UNA CONVERSACIÓN A UNA ENTREGA / 01—04',
    title: 'Una idea clara.\n*Un proceso cuidado.*',
    lead: 'Queremos que cada cliente sepa qué estamos creando, por qué lo hacemos y cuál es el siguiente paso.',
    steps: [
      {
        num: '01',
        title: 'Descubrimiento',
        body: 'Conocemos tu marca, audiencia, objetivo, referencias, plazos y alcance.'
      },
      {
        num: '02',
        title: 'Dirección creativa',
        body: 'Definimos el concepto, los formatos, el tratamiento visual y un plan de producción.'
      },
      {
        num: '03',
        title: 'Producción',
        body: 'Coordinamos talento, equipo, locaciones, iluminación y captura según las necesidades del proyecto.'
      },
      {
        num: '04',
        title: 'Postproducción y entrega',
        body: 'Trabajamos edición, sonido, color y adaptaciones para los canales acordados, con espacio para revisar.'
      }
    ]
  },
  intercut: {
    left: 'THE KIZVNA CONNECTION / 001—007',
    right: 'UNA CULTURA EN MOVIMIENTO',
    title: 'Una historia.\n*Infinitas formas de contarla.*',
    label: 'Montaje de nuestras disciplinas',
    frames: [
      { num: '01', label: 'CONTENT / IDEAS QUE SE VEN' },
      { num: '02', label: 'PEOPLE / VOCES QUE CONECTAN' },
      { num: '03', label: 'SOUND / HISTORIAS QUE SUENAN' },
      { num: '04', label: 'LEARN / SABER QUE SE COMPARTE' },
      { num: '05', label: 'CULTURE / FORMAS DE EXPRESAR' }
    ],
    body: 'La cámara, la canción, una marca, una persona o una prenda. Todo puede formar parte del mismo universo cuando existe una conexión real.'
  },
  manifesto: {
    left: 'EL CÓDIGO KIZVNA / 07',
    right: '絆 — CONEXIÓN',
    title: 'La técnica crea\nuna imagen.\n*El vínculo le da alma.*',
    body: 'KOFAH. Recordar, aprender, avanzar. Realness, lealtad, determinación y familia. No olvidamos de dónde venimos mientras imaginamos todo lo que podemos crear.',
    sign: 'WE KEEP IT REAL.\nALWAYS.'
  },
  connection: {
    label: 'Las disciplinas y personas que dan vida a KIZVNA',
    alt: 'Equipo creativo multicultural colaborando en un estudio entre moda, música y producción digital',
    topLeft: 'KIZVNA / CULTURA EN MOVIMIENTO',
    topRight: '07 — 08 / CONEXIÓN',
    nodes: ['IMAGEN', 'SONIDO', 'CULTURA', 'TALENTO'],
    core: 'UN MISMO\nVÍNCULO.',
    stories: [
      {
        kicker: 'LAS DISCIPLINAS SE ENCUENTRAN',
        title: 'Una idea puede\n*tomar muchas formas.*',
        body: 'Imagen, sonido, moda y talento. Cada lenguaje aporta una perspectiva distinta.'
      },
      {
        kicker: 'LO QUE NOS UNE',
        title: 'La diferencia\n*crea posibilidades.*',
        body: 'Cuando las miradas se cruzan, las ideas se transforman en algo que nadie hubiera imaginado por separado.'
      },
      {
        kicker: 'LA CONEXIÓN SE HACE REAL',
        title: 'Nadie crea\n*algo grande en solitario.*',
        body: 'Visiones distintas. Una historia compartida.'
      }
    ]
  },
  contact: {
    eyebrow: 'TU HISTORIA PUEDE SER LA SIGUIENTE',
    title: 'No busques\nhacer más ruido.\n*Haz que se sienta.*',
    body: 'Contenido social, una campaña con creadores, un taller, una canción o un universo de moda urbana. Hablemos de lo que viene.',
    cta: 'HABLEMOS DE TU PROYECTO',
    aside: 'FROM CONCEPT TO EMOTION / KIZVNA®'
  },
  footer: {
    line: 'NO ES SOLO UNA MARCA. ES UN VÍNCULO.',
    universe: 'PARTE DEL UNIVERSO MERAKAI ↗',
    note: 'VISUALES CONCEPTUALES'
  }
}

const en: CinemaCopy = {
  skip: 'Skip to content',
  nav: {
    home: 'KIZVNA, home',
    vision: 'The vision',
    production: 'Production',
    creators: 'Creators',
    essence: 'Our essence',
    menu: 'MENU',
    open: 'Open menu',
    close: 'Close menu',
    primary: 'Primary navigation'
  },
  opening: {
    eyebrow: 'KIZVNA / CONTENT · CULTURE · CONNECTION',
    tagline: 'Ideas that connect.\n*Content you can feel.*',
    scroll: 'DISCOVER OUR UNIVERSE',
    portalKicker: 'WHAT CONNECTS US',
    portalTitle: 'Behind every story\n*there is a real connection.*',
    portalNote: 'KIZVNA / THE CONNECTION',
    frameLeft: 'KIZVNA / FRAME 001',
    frameRight: 'CREATIVE PRODUCTION / EST. IN CONNECTION'
  },
  vision: {
    eyebrow: '01 / THE STARTING POINT',
    title: 'The next story\ncan begin\n*on a small screen.*',
    body: 'KIZVNA comes from music and from kizuna: the bonds that hold us together. We want to carry that connection into video, campaigns, creators, learning, and urban culture. We think big without losing what is authentic.',
    aside: '01 — 07\nEXPLORE THE UNIVERSE ↓'
  },
  intro: {
    kicker: 'THE KIZVNA UNIVERSE',
    line: 'One idea. Many worlds. One connection.',
    hint: 'SCROLL TO ENTER ↓'
  },
  chapters: {
    cinema: {
      id: 'cine',
      kind: 'chapter-cinema',
      alt: 'A Black creative director coordinating a shoot with a mirrorless camera and a diverse production crew',
      index: '01 / AUDIOVISUAL CONTENT',
      scene: 'CREATOR SET / REC',
      record: true,
      overline: 'PRODUCTION WITH INTENT',
      title: 'One idea.\n*A thousand ways to see it.*',
      body: 'Reels, campaigns, music videos, and brand content. Agile crews, a creative eye, and professional production made for the screens of today.',
      detail: 'FROM IDEA TO CONTENT',
      tags: 'Concept · Shoot · Edit · Shorts · Reels · Social video'
    },
    ad: {
      id: 'publicidad',
      kind: 'chapter-ad',
      alt: 'A commercial production set with studio lighting and a technical crew',
      index: '02 / ADVERTISING AND CAMPAIGNS',
      scene: 'BEHIND THE CONCEPT',
      record: true,
      overline: 'THE CONCEPT IN MOTION',
      title: 'Ideas that\n*become impact.*',
      body: 'From concept to execution: commercials and campaigns built to shape identity, stir emotion, and open conversations.',
      detail: 'FROM BRIEF TO IMAGE',
      tags: 'Concept · Art direction · Commercial production · Campaigns'
    },
    creators: {
      id: 'creadores',
      kind: 'chapter-influencer',
      alt: 'Influencers and creatives preparing a social campaign in a studio',
      index: '03 / CREATORS AND INFLUENCERS',
      scene: 'CREATOR CULTURE / LIVE',
      record: true,
      overline: 'PEOPLE BEFORE NUMBERS',
      title: 'Influence\n*starts with connection.*',
      body: 'We imagine a place where talent, brands, and communities build real collaborations. Representation, creative direction, and campaigns with a point of view.',
      detail: 'CREATOR UNIVERSE',
      tags: 'Talent development · Creator campaigns · Production · Community'
    },
    training: {
      id: 'formacion',
      kind: 'chapter-training',
      alt: 'A mentor teaching creators to use a professional camera and light in a hands-on workshop',
      index: '04 / TRAINING AND WORKSHOPS',
      scene: 'SHARE THE KNOW-HOW',
      record: false,
      overline: 'TALENT CAN ALSO BE GROWN',
      title: 'Learn.\n*Create. Share.*',
      body: 'We want to open rooms for learning production, content making, narrative, and personal brand. Sharing knowledge creates bonds too.',
      detail: 'LEARN BY DOING',
      tags: 'Workshops · Mentorships · Creator training · Audiovisual practice'
    },
    music: {
      id: 'musica',
      kind: 'chapter-music',
      alt: 'A Black singer recording while a Black producer works an analog console',
      index: '05 / MUSIC AND SOUND',
      scene: 'REC SESSION',
      record: true,
      overline: 'WHERE IT ALL BEGAN',
      title: 'First\n*we feel it.*',
      body: 'Our root is music. In the studio, in the voices, and in the stories that deserve a sound and an identity of their own.',
      detail: 'THE SOUND OF AN IDENTITY',
      tags: 'Music production · Artistic identity · Visual direction · Content',
      bars: true
    },
    atelier: {
      id: 'moda',
      kind: 'chapter-atelier',
      alt: 'A streetwear designer sewing a jacket in a workshop',
      index: '06 / FASHION — THE PROCESS',
      scene: 'DESIGN LAB / WORK IN PROGRESS',
      record: false,
      overline: 'CULTURE GETS DRESSED TOO',
      title: 'From an idea\n*to an identity.*',
      body: 'Streetwear, experimental design, contemporary tailoring, and new silhouettes. A garment can become a way of speaking.',
      detail: 'FROM FORM TO MEANING',
      tags: 'Visual concept · Styling · Art direction · Editorial narrative'
    },
    fashion: {
      id: 'editorial',
      kind: 'chapter-fashion',
      alt: 'A model in streetwear posing for cameras during a campaign',
      index: '07 / FASHION — THE EXPRESSION',
      scene: 'EDITORIAL / LIGHTS ON',
      record: true,
      overline: 'FROM THE STUDIO TO THE CAMPAIGN',
      title: 'An attitude.\n*A whole universe.*',
      body: 'Fashion talks with music, art, culture, and people. Every aesthetic has a story and a place in the KIZVNA universe.',
      detail: 'THE STORY AT FULL VOLUME',
      tags: 'Editorials · Fashion films · Photography · Fashion production'
    }
  },
  breathers: {
    scene: '01 / SCENE CHANGE\nThe difference is\nin *how we tell it.*',
    emotion: '02 / A NEW SET\nAttention lasts seconds.\n*The feeling stays.*',
    frequency:
      '05 / FREQUENCY CHANGE\nA song can last minutes.\n*Its story, a whole life.*'
  },
  commitment: {
    left: 'WHAT DEFINES US / OUR PRINCIPLES',
    right: 'WORK WITH INTENT',
    title: 'A great idea deserves\n*great care.*',
    body: 'Talent matters. The way of working decides what a story can become. These are the principles we want in every collaboration.',
    items: [
      {
        kicker: '01 / WE LISTEN',
        title: 'We understand first.',
        body: 'Before we roll, we look for the identity, the goals, the people, and the message behind the project. Direction starts with a good conversation.'
      },
      {
        kicker: '02 / WE RESPECT',
        title: 'Talent and trust.',
        body: 'We value the time, the ideas, and the work of every person involved. Collaboration needs clear communication, respect for difference, and transparent agreements.'
      },
      {
        kicker: '03 / WE TAKE CARE',
        title: 'Every creative decision.',
        body: 'A good result comes from preparation: references, script, planning, execution, edit, and review. The process matters as much as what appears on screen.'
      },
      {
        kicker: '04 / WE EVOLVE',
        title: 'We learn so we can go further.',
        body: 'Culture, technology, and platforms change. We want to experiment, learn, and refine formats without losing authenticity.'
      }
    ]
  },
  services: {
    kicker: 'SPECIALTIES / WHAT WE CAN MAKE WITH YOU',
    title: 'The team to\n*bring your idea to life.*',
    body: 'Every project is different. We can shape the story, design its universe, and produce the formats it needs. These are the lines that hold the KIZVNA vision.',
    listLabel: 'Six KIZVNA specialties',
    items: [
      {
        num: '01 / VIDEO & SOCIAL',
        title: 'Content for social.',
        points: [
          'Concept, script, and creative direction.',
          'Reels, TikTok, Shorts, and product content.',
          'Shooting, editing, and adapting to each platform.'
        ]
      },
      {
        num: '02 / CAMPAIGNS',
        title: 'Advertising and commercials.',
        points: [
          'Advertising concepts with an identity.',
          'Art direction, preproduction, and realization.',
          'Campaigns adapted to different formats.'
        ]
      },
      {
        num: '03 / CREATOR CULTURE',
        title: 'Creators and collaborations.',
        points: [
          'Campaigns and content with creators.',
          'Creative direction of talent.',
          'Representation as a line of growth.'
        ]
      },
      {
        num: '04 / SOUND',
        title: 'Music and artistic identity.',
        points: [
          'Creative development of music projects.',
          'Music videos, sessions, and visual content.',
          'An identity that connects image and sound.'
        ]
      },
      {
        num: '05 / FASHION',
        title: 'Fashion and editorial direction.',
        points: [
          'Concept, styling, and art direction.',
          'Photography, lookbooks, and fashion films.',
          'Urban and experimental aesthetics.'
        ]
      },
      {
        num: '06 / LEARN',
        title: 'Training and workshops.',
        points: [
          'Hands-on content-making workshops.',
          'Audiovisual language and on-camera presence.',
          'Personal brand and digital skills as a vision for expansion.'
        ]
      }
    ],
    note: 'THE SCOPE IS DEFINED WITH YOU',
    noteBody:
      'Not every project needs everything. We build a proposal around your goals and the right resources.',
    cta: 'TALK ABOUT MY PROJECT ↗'
  },
  interludes: {
    creators: {
      label: 'From making to learning',
      left: 'KIZVNA / FROM TALENT TO COMMUNITY',
      right: '03 → 04',
      kicker: 'IDEAS GROW WHEN THEY CIRCULATE',
      title: 'Making connects us.\n*Sharing takes us further.*',
      body: 'A story can inspire thousands. The knowledge behind that story can push the people who will make the next one.',
      bottom: 'BEHIND EVERY CREATOR THERE IS SOMETHING TO LEARN',
      next: 'CONTINUE ↓'
    },
    fashion: {
      label: 'From design to editorial expression',
      left: 'KIZVNA / FROM FORM TO ATTITUDE',
      right: '06 → 07',
      kicker: 'EVERY DETAIL TELLS A STORY',
      title: 'A garment takes shape.\n*A gaze turns it into culture.*',
      body: 'From the workshop to the lens, from material to movement: identity comes alive when someone makes it their own.',
      bottom: 'FROM PROCESS TO EXPRESSION',
      next: 'CONTINUE ↓'
    }
  },
  workflow: {
    alt: 'A multicultural production team planning a shoot and reviewing audiovisual equipment',
    eyebrow: 'FROM A CONVERSATION TO A DELIVERY / 01—04',
    title: 'A clear idea.\n*A careful process.*',
    lead: 'We want every client to know what we are making, why we are making it, and what the next step is.',
    steps: [
      {
        num: '01',
        title: 'Discovery',
        body: 'We learn your brand, audience, goal, references, timing, and scope.'
      },
      {
        num: '02',
        title: 'Creative direction',
        body: 'We define the concept, the formats, the visual treatment, and a production plan.'
      },
      {
        num: '03',
        title: 'Production',
        body: 'We coordinate talent, crew, locations, lighting, and capture for what the project needs.'
      },
      {
        num: '04',
        title: 'Post and delivery',
        body: 'We work on edit, sound, color, and adaptations for the agreed channels, with room to review.'
      }
    ]
  },
  intercut: {
    left: 'THE KIZVNA CONNECTION / 001—007',
    right: 'A CULTURE IN MOTION',
    title: 'One story.\n*Endless ways to tell it.*',
    label: 'A montage of our disciplines',
    frames: [
      { num: '01', label: 'CONTENT / IDEAS YOU CAN SEE' },
      { num: '02', label: 'PEOPLE / VOICES THAT CONNECT' },
      { num: '03', label: 'SOUND / STORIES YOU CAN HEAR' },
      { num: '04', label: 'LEARN / KNOWLEDGE THAT IS SHARED' },
      { num: '05', label: 'CULTURE / WAYS OF EXPRESSING' }
    ],
    body: 'The camera, the song, a brand, a person, or a garment. All of it can belong to the same universe when there is a real connection.'
  },
  manifesto: {
    left: 'THE KIZVNA CODE / 07',
    right: '絆 — CONNECTION',
    title: 'Technique makes\nan image.\n*The bond gives it a soul.*',
    body: 'KOFAH. Remember, learn, move forward. Realness, loyalty, determination, and family. We do not forget where we come from while we imagine everything we can make.',
    sign: 'WE KEEP IT REAL.\nALWAYS.'
  },
  connection: {
    label: 'The disciplines and people that bring KIZVNA to life',
    alt: 'A multicultural creative team collaborating in a studio between fashion, music, and digital production',
    topLeft: 'KIZVNA / CULTURE IN MOTION',
    topRight: '07 — 08 / CONNECTION',
    nodes: ['IMAGE', 'SOUND', 'CULTURE', 'TALENT'],
    core: 'THE SAME\nBOND.',
    stories: [
      {
        kicker: 'THE DISCIPLINES MEET',
        title: 'An idea can\n*take many forms.*',
        body: 'Image, sound, fashion, and talent. Each language brings a different point of view.'
      },
      {
        kicker: 'WHAT UNITES US',
        title: 'Difference\n*creates possibility.*',
        body: 'When ways of seeing cross, ideas become something no one would have imagined alone.'
      },
      {
        kicker: 'THE CONNECTION BECOMES REAL',
        title: 'No one makes\n*something large alone.*',
        body: 'Different visions. One shared story.'
      }
    ]
  },
  contact: {
    eyebrow: 'YOUR STORY CAN BE NEXT',
    title: 'Do not look to\nmake more noise.\n*Make it felt.*',
    body: 'Social content, a campaign with creators, a workshop, a song, or an urban fashion universe. Let us talk about what is next.',
    cta: 'LET US TALK ABOUT YOUR PROJECT',
    aside: 'FROM CONCEPT TO EMOTION / KIZVNA®'
  },
  footer: {
    line: 'NOT JUST A BRAND. A BOND.',
    universe: 'PART OF THE MERAKAI UNIVERSE ↗',
    note: 'CONCEPT VISUALS'
  }
}

export function cinemaCopy(locale: string): CinemaCopy {
  return locale === 'en' ? en : es
}
