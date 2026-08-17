/**
 * Royal Elegance — Wedding Invitation Template
 * Customized for Mirza Mohammad Faizan & Siddiqui Sufiya Bano
 * Contains full English & Urdu localization strings.
 */
window.CONFIG = {
  // Configuration flags
  theme: {
    skin: "emerald", // "emerald" | "sage" | "maroon"
    bismillah: true,
  },
  couple: {
    bride: "Sufiya",
    groom: "Faizan",
    monogram: "F & S",
  },
  wedding: {
    // Baraat & Nikah date to drive the countdown (15th October 2026, 3:00 PM)
    date: "2026-10-15T15:00:00",
  },
  venue: {
    name: "Milan Hall",
    address: "Gali Number 3, near Madina Masjid Road, Shastri Chowk, Railway Colony, Limbayat, Surat, Gujarat - 395012",
    mapsQuery: "Milan Hall, Limbayat, Surat, Gujarat 395012",
    mapsLink: "https://maps.app.goo.gl/DxrUQyA756f27jN7A",
    mapsEmbed: "",
  },
  music: {
    enabled: true,
    audioMode: "nasheed",
    src: "https://archive.org/download/jamendo-087760/04.mp3", // Maher Zain - Baraka Allahu Lakuma
    startMuted: true,
  },
  dressCode: {
    enabled: true,
    colors: ["#0B4F3C", "#D4AF37", "#FFF8EC", "#EFE1C6", "#5C1A1A"],
  },
  hero: {
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80",
  },
  story: [
    {
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80",
      caption: {
        en: "By the grace of Allah, our journeys crossed",
        ur: "اللہ تعالیٰ کے فضل سے، ہماری راہیں ملیں"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80",
      caption: {
        en: "The proposal and blessing from our families",
        ur: "خاندانوں کی طرف سے رشتہ اور دعائیں"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
      caption: {
        en: "Starting our new chapter with faith and love",
        ur: "ایمان اور محبت کے ساتھ نئے سفر کا آغاز"
      }
    }
  ],

  // Translation data dictionary
  DATA: {
    bismillahArabic: {
      en: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      ur: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
    },
    bismillahTranslation: {
      en: "In the name of Allah, the Most Gracious, the Most Merciful",
      ur: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے"
    },
    openingPoetry: {
      en: "Whether it is the laughter of flowers or the grace of stars, Everything is sacrificed for you; let us bring words of praise. Cast a glance, O Bahatlama, O Seeker of Mysteries; Through the grace of the King of the Beloved of Allah, grant us the vision of the Sufi.",
      ur: "پھولوں کی ہنسی ہو کہ ستاروں کی ادائیں، سب آپ پر قربان ہیں، تعریف تو لائیں۔ ایک نظر بہتلاما، یا صوفی اسرار کن، از طفیلِ شاہِ حبیب اللہ، صوفی دیدار کن۔"
    },
    invitationMessage: {
      en: "Assalamu Alaikum wa Rahmatullahi wa Barakatuhu. After Salam, we humbly request that by the grace and mercy of Allah Almighty, the marriage of our beloved son, Noor-e-Nazar, has been fixed on the dates mentioned below. On this blessed and joyful occasion, we request you to honour us with your gracious presence and give us the opportunity to thank you for your valuable attendance. Please grace the occasion with your presence and bless the couple with your prayers.",
      ur: "السلام علیکم ورحمۃ اللہ وبرکاتہ۔ بعد سلام، گزارش ہے کہ اللہ تعالیٰ کے فضل و کرم سے ہمارے لختِ جگر، نورِ نظر کی شادی نیچے لکھی تاریخوں میں طے ہوئی ہے۔ اس مبارک اور مسرت آمیز موقع پر آپ اپنی قیمتی تشریف آوری سے ہمیں ممنون فرما کر شکریہ ادا کرنے کا موقع عطا فرمائیں۔ اپنی تشریف آوری سے اس خوشی کو دوبالا فرمائیں اور جوڑے کو اپنی دعاؤں سے نوازیں۔"
    },

    groom: {
      name: { en: "Mirza Mohammad Faizan", ur: "مرزا محمد فیضان" },
      relation: { en: "Son of Mirza Mohammad Faiyaz", ur: "ولد مرزا محمد فیاض" },
      residence: { en: "Sudesra, Fatehpur (U.P.)", ur: "سُدیسر، فتح پور (اتر پردیش)" },
      title: { en: "Noor-e-Chashm", ur: "نورِ چشم" }
    },
    bride: {
      name: { en: "Siddiqui Sufiya Bano", ur: "صدیقی صفیہ بانو" },
      relation: { en: "Daughter of Mohammad Akbar Ali", ur: "دختر محمد اکبر علی" },
      residence: { en: "Jahangir Nagar, Gahure, Fatehpur (U.P.)", ur: "جہانگیر نگر، گڑھے، فتح پور (اتر پردیش)" },
      title: { en: "Noor-e-Chashmi", ur: "نورِ چشمی" }
    },

    headings: {
      weddingTitle: { en: "Nikah Celebration", ur: "نکاح کی تقریب" },
      invitation: { en: "Invitation", ur: "دعوت نامہ" },
      eyebrowBlessing: { en: "With the blessing of Allah", ur: "فضلِ باری تعالیٰ" },
      enterInvitation: { en: "Enter Invitation", ur: "دعوت نامہ کھولیں" },
      saveDate: { en: "Save the Date", ur: "تاریخ محفوظ کریں" },
      scratchHint: { en: "Scratch here", ur: "یہاں کھرچیں" },
      scratchDay: { en: "Thursday", ur: "جمعرات" },
      scratchDate: { en: "15th October 2026", ur: "15 اکتوبر 2026" },
      countdownTitle: { en: "Nikah Countdown", ur: "نکاح کا وقت" },
      countdownDays: { en: "Days", ur: "دن" },
      countdownHours: { en: "Hours", ur: "گھنٹے" },
      countdownMins: { en: "Minutes", ur: "منٹ" },
      countdownSecs: { en: "Seconds", ur: "سیکنڈ" },
      journey: { en: "Our Journey", ur: "ہمارا سفر" },
      journeySub: { en: "Moments of blessing along the way", ur: "بابہت اور مبارک سفر کے کچھ لمحات" },
      celebrations: { en: "Celebrations", ur: "تقاریب" },
      celebrationsSub: { en: "Join us in these blessed ceremonies", ur: "ان مبارک تقاریب میں ہماری خوشیوں میں شریک ہوں" },
      venue: { en: "Venue", ur: "مقام" },
      dressCode: { en: "Dress Code", ur: "لباس کا ضابطہ" },
      dressBtnShow: { en: "Show Guidelines", ur: "معلومات دیکھیں" },
      dressBtnHide: { en: "Hide Guidelines", ur: "معلومات چھپائیں" },
      dressText: {
        en: "To respect the sacred venue, we request that guests dress in modest formal attire. Traditional sherwanis or formal suits are suggested for gentlemen, and elegant, modest long dresses for ladies. A head covering is appreciated for the mosque sanctuary.",
        ur: "مقدس مقام کا احترام کرتے ہوئے، مہمانوں سے التماس ہے کہ وہ باوقار اور باحجاب لباس زیب تن فرمائیں۔ مرد حضرات کے لیے شیروانی یا رسمی سوٹ، اور خواتین کے لیے بازوؤں والے پروقار اور باپردہ لباس موزوں ہیں۔"
      },
      rsvpTitle: { en: "RSVP", ur: "اطلاعِ آمد (آر ایس وی پی)" },
      rsvpSub: { en: "We would be honoured by your presence", ur: "ہم آپ کی تشریف آوری پر فخر محسوس کریں گے" },
      rsvpName: { en: "Name", ur: "نام" },
      rsvpGuests: { en: "Number of Guests", ur: "مہمانوں کی تعداد" },
      rsvpAttending: { en: "Attending", ur: "شریک ہوں گے؟" },
      rsvpYes: { en: "Yes", ur: "جی ہاں" },
      rsvpNo: { en: "No", ur: "جی نہیں" },
      rsvpMessage: { en: "Message / Mubarakbad", ur: "پیغام / مبارکباد" },
      rsvpSubmit: { en: "Submit RSVP", ur: "اطلاع بھیجیں" },
      rsvpSending: { en: "Sending...", ur: "بھیجا جا رہا ہے..." },
      rsvpSuccessTitle: { en: "JazakAllah Khair", ur: "جزاک اللہ خیر" },
      rsvpSuccessMsg: { en: "Your response has been received with love.", ur: "آپ کا جواب محبت کے ساتھ موصول ہو گیا ہے۔" },
      wishesTitle: { en: "Wishes Wall", ur: "مبارکباد کی دیوار" },
      wishesSub: { en: "Warm prayers from those we love", ur: "عزیز و اقارب کی پیاری دعائیں" },
      directions: { en: "Get Directions", ur: "راستہ دیکھیں" }
    },

    events: {
      baraatNikah: {
        name: { en: "Baraat & Nikah", ur: "بارات و نکاح" },
        date: { en: "15 October 2026 (Thursday)", ur: "15 اکتوبر 2026 (جمعرات)" },
        time: { en: "3:00 PM", ur: "دوپہر 3:00 بجے" },
        venue: { en: " Unn, Surat, Gujarat", ur: " اُون، سورت، گجرات" },
        desc: {
          en: "Join us as we solemnize our marriage contract and bless the union under the grace of Allah.",
          ur: "اللہ تعالیٰ کے فضل سے، عقدِ نکاح اور بارات کی بابرکت محفل میں شرکت فرما کر دولہا دلہن کو دعاؤں سے نوازیں۔"
        }
      },
      dawateTaam: {
        name: { en: "Dawat-e-Ta'am", ur: "دعوتِ طعام" },
        date: { en: "17 October 2026 (Saturday)", ur: "17 اکتوبر 2026 (ہفتہ)" },
        time: { en: "11:00 AM", ur: "صبح 11:00 بجے" },
        desc: {
          en: "The marriage feast hosted by the family to celebrate our union. Separate arrangements for Ladies and Gents are configured.",
          ur: "شادی کی خوشی میں دعوتِ طعام (ولیمہ) کا اہتمام کیا گیا ہے۔ خواتین اور مردوں کے لیے علاحدہ علاحدہ انتظام ہے۔"
        },
        gentsVenue: { en: "Gents: Milan Hall", ur: "مرد حضرات: ملن ہال" },
        ladiesVenue: { en: "Ladies: Mayur Hall", ur: "خواتین: مایور ہال" }
      }
    },

    sarparastHazrat: {
      heading: { en: "Family Elders / Patrons", ur: "سرپرست حضرات" },
      names: {
        en: ["Haji Niyaz Beg Sahib", "Late Haji Lal Mohammad Sahib", "Nazar Mohammad Sahib"],
        ur: ["حاجی نیاز بیگ صاحب", "مرحوم حاجی لال محمد صاحب", "نظر محمد صاحب"]
      }
    },

    guestNames: {
      heading: { en: "Family & Guests", ur: "عزیز و اقارب" },
      group1: {
        en: ["Anas Khan", "Mohammad Hussain", "Mirza Farhan", "Mirza Salman", "Mirza Zeeshan", "Mirza Kamran", "Mirza Meraaz", "Mirza Miftah"],
        ur: ["انس خان", "محمد حسین", "مرزا فرحان", "مرزا سلمان", "مرزا ذیشان", "مرزا کامران", "مرزا میراز", "مرزا مفتاح"]
      },
      group2: {
        en: ["Mirza Faizan", "Mirza Irfan", "Mirza Iqbal", "Mirza Taufiq", "Mirza Riyaz", "Mirza Ihtiyaq", "Siddiqui Akbar Ali", "Sarwar Khan", "Siddiqui Ghiyas Ahmad", "Abdul Rehman", "Intiyaz Ahmad"],
        ur: ["مرزا فیضان", "مرزا عرفان", "مرزا اقبال", "مرزا توفیق", "مرزا ریاض", "مرزا احتیاک", "صدیقی اکبر علی", "سرور خان", "صدیقی غیاث احمد", "عبدالرحمان", "امتیاز احمد"]
      }
    },

    houseAddress: {
      heading: { en: "House Address", ur: "گھر کا پتہ" },
      address: {
        en: "Padmavati Society Gali No 1 Opp Raza Masjid Limbayat Surat 394210 9824560097/7359276397/6358959786",
        ur: "پدماوتی سوسائٹی, گلی نمبر 1, عذرا مسجد کے پاس, لمبیایت, سورت, گجرات– 9824560097/7359276397/6358959786 0"
      }
    }
  },
  footer: {
    credit: "Barakallahu Lakuma wa Baraka Alaikuma"
  }
};
