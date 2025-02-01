/**
 * מפה של תכנים סטטיים לכל טיפוס (ניתן לעדכן ולהרחיב)
 */
const typeDetails = {
    A: {
      title: "טיפוס A – הפרפקציוניסט",
      description: "את/ה שואף/ת לשלמות, מסודר/ת ומחפש/ת לשפר כל פרט. חשוב לזכור שהמצוינות היא יעד, לא מצב קבע."
    },
    B: {
      title: "טיפוס B – העוזר",
      description: "את/ה שם/ת לב ולב, ותמיד מוכן/ה לעזור לאחרים. הנכונות שלך לתמוך בזולת היא מתנת הלב שלך."
    },
    C: {
      title: "טיפוס C – המשיג",
      description: "הישגים והכרה הם המדדים עבורך. את/ה שואף/ת להצלחה ומאמין/ה שדרך הישגים ניתן להוכיח ערך אישי."
    },
    D: {
      title: "טיפוס D – האינדיבידואליסט",
      description: "את/ה חש/ה שונה, ייחודי/ת ובעל/ת עומק רגשי. החיפוש אחר זהות ומסע פנימי הוא חלק בלתי נפרד ממך."
    },
    E: {
      title: "טיפוס E – החוקר",
      description: "סקרנותך ויכולתך להעמיק בנושאים מייחדים אותך. את/ה תמיד מחפש/ת ידע והבנה מעמיקה של העולם."
    },
    F: {
      title: "טיפוס F – הנאמן",
      description: "ביטחון, יציבות ונאמנות הם הבסיס עבורך. את/ה שואף/ת לסביבה בטוחה ומסודרת בה תוכל/י לפרוח."
    },
    G: {
      title: "טיפוס G – החיובי",
      description: "אהבת החיים והתרגשות מהרגעים הקטנים מניעים אותך. את/ה יודע/ת ליהנות מהחיים בכל מצב."
    },
    H: {
      title: "טיפוס H – המנהיג",
      description: "כישורי מנהיגות וביטחון עצמי הם חלק בלתי נפרד ממך. את/ה מוביל/ה באומץ ומכוון/ת למטרות גדולות."
    },
    I: {
      title: "טיפוס I – המגשר",
      description: "יכולת הגישור והבנה בין דעות שונות הם הכלים שלך להביא לאיזון והרמוניה בסביבתך."
    }
  };
  
  /**
   * קורא את הפרמטרים מה-URL (לדוגמה: ?type=A&secondary=B)
   */
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const primary = params.get('type');
    const secondary = params.get('secondary');
    return { primary, secondary };
  }
  
  /**
   * מוסיף הודעה לחלון הצ'אט
   * @param {string} sender - "bot" או "user"
   * @param {string} text - תוכן ההודעה
   */
  function addMessage(sender, text) {
    const chatWindow = document.getElementById("chat-window");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender);
  
    const senderDiv = document.createElement("div");
    senderDiv.classList.add("message-sender");
    senderDiv.textContent = sender === "user" ? "את/ה" : "EnneaBot";
  
    const textDiv = document.createElement("div");
    textDiv.classList.add("message-text");
    textDiv.textContent = text;
  
    messageDiv.appendChild(senderDiv);
    messageDiv.appendChild(textDiv);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  
  /**
   * מציג שיחה מדורגת עם הודעות בהתאם לתוצאות השאלון
   */
  function displayConversation() {
    const { primary, secondary } = parseUrlParams();
    if (!primary || !secondary) {
      addMessage("bot", "מצטער/ת, לא נמצאו תוצאות. אנא וודא שקישור ההפניה תקין.");
      return;
    }
  
    const messages = [
      "שלום, אני EnneaBot. אני כאן כדי להציג לך את תוצאות שאלון האניאגרם.",
      `הטיפוס העיקרי שלך הוא: ${typeDetails[primary] ? typeDetails[primary].title : primary}.`,
      typeDetails[primary] ? typeDetails[primary].description : "",
      `הטיפוס המשני שלך הוא: ${typeDetails[secondary] ? typeDetails[secondary].title : secondary}.`,
      typeDetails[secondary] ? typeDetails[secondary].description : "",
      "אלו התוצאות שלך – אם תרצה לדעת עוד, לחץ על 'מידע נוסף' לקבלת ניתוח מעמיק וטיפים."
    ];
  
    let delay = 500;
    messages.forEach(msg => {
      setTimeout(() => {
        if (msg.trim() !== "") addMessage("bot", msg);
      }, delay);
      delay += 1500;
    });
  }
  
  /**
   * מפעיל את תהליך השיחה בעת טעינת הדף
   */
  document.addEventListener("DOMContentLoaded", function() {
    displayConversation();
  });
  
  /**
   * מחליף את תצוגת אזור המידע הנוסף
   */
  function toggleDetails() {
    const detailsSection = document.getElementById("details");
    detailsSection.classList.toggle("hidden");
    if (!detailsSection.classList.contains("hidden")) {
      detailsSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  /**
   * פונקציה לשיתוף תוצאות – לדוגמה, העתקת קישור ללוח
   */
  function shareResult() {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("קישור הועתק ללוח!");
      }).catch(err => {
        alert("אירעה שגיאה בהעתקת הקישור.");
      });
    } else {
      prompt("העתק את הקישור:", shareUrl);
    }
  }
  