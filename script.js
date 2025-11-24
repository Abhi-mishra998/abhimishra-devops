// Set current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navMenu.classList.remove("active");
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px 0px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document
  .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
  .forEach((el) => {
    observer.observe(el);
  });

// Make hero visible immediately for better mobile responsiveness
document.querySelector(".hero-text").classList.add("visible");
document.querySelector(".hero-image").classList.add("visible");

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(
    `Thank you ${name}! Your message has been received. I'll get back to you soon.`
  );
  document.getElementById("contactForm").reset();
});

// Newsletter subscription
function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail").value;

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(`Thank you for subscribing! You'll receive updates at ${email}.`);
  document.getElementById("newsletterEmail").value = "";
}

// Header scroll effect
const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    header.style.background = "rgba(10, 10, 10, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.9)";
    header.style.boxShadow = "none";
  }

  lastScrollTop = scrollTop;
});

// Progress bar animation
const animateProgressBars = () => {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
};

// Animate progress bars when skills section is visible
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Removed unused testimonials carousel code

// Typing animation for hero text
const typeWriter = (element, text, speed = 100) => {
  if (!element) return;
  element.classList.add("typing");
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      // remove typing cursor after small delay
      setTimeout(() => element.classList.remove("typing"), 300);
    }
  }, speed);
};

// Initialize typing animation
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});

// Add smooth hover effects for cards
document
  .querySelectorAll(
    ".skill-card, .project-card, .testimonial-card, .achievement-card"
  )
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });

// Parallax effect for hero section (uses requestAnimationFrame, respects reduced-motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const parallaxElements = Array.from(document.querySelectorAll('.floating-icon'));
  let lastScroll = 0;
  let ticking = false;
  // when scrolling stops, clear inline transforms so CSS animations can run again
  let clearTransformTimer = null;

  const clearTransforms = () => {
    parallaxElements.forEach((el) => {
      // only clear transforms if not being dragged
      if (!el.classList.contains('dragging')) el.style.transform = '';
    });
  };

  const onScroll = () => {
    lastScroll = window.pageYOffset || document.documentElement.scrollTop;

    // while scrolling, cancel any pending clear
    if (clearTransformTimer) {
      clearTimeout(clearTransformTimer);
      clearTransformTimer = null;
    }

    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxElements.forEach((element, index) => {
          const speed = 0.18 + index * 0.06; // subtle parallax
          const y = Math.round(lastScroll * speed);
          // apply transform in addition to CSS animation; this will be cleared after scrolling stops
          element.style.transform = `translateY(${y}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }

    // clear transforms 220ms after scrolling stops so CSS animation resumes
    clearTransformTimer = setTimeout(() => {
      clearTransforms();
    }, 220);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Enhanced form validation
const validateForm = (formData) => {
  const errors = [];

  if (formData.name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (formData.subject.length < 5) {
    errors.push("Subject must be at least 5 characters long");
  }

  if (formData.message.length < 10) {
    errors.push("Message must be at least 10 characters long");
  }

  return errors;
};

// Update contact form with better validation
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  const errors = validateForm(formData);

  if (errors.length > 0) {
    alert("Please fix the following errors:\n" + errors.join("\n"));
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show loading state
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    alert(
      `Thank you ${formData.name}! Your message has been received. I'll get back to you soon.`
    );
    document.getElementById("contactForm").reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("active");
  }
});

// Nav link active state on click (simple UX enhancement)
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach((l) => l.classList.remove('active-link'));
    link.classList.add('active-link');
  });
});

// Top scroll progress bar update
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
    progressBar.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

// Typing loop under hero subtitle (cycles short phrases). Respects reduced-motion.
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typingEl = document.getElementById('typingLoop');
if (typingEl && !prefersReduced) {
  const phrases = [
    'AWS • Kubernetes • Terraform',
    'CI/CD • Docker • GitHub Actions',
    'Infrastructure as Code',
    'DevSecOps • Monitoring & Security',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let forward = true;
  const typeSpeed = 40;
  const pauseBetween = 1200;

  const typeLoop = () => {
    const current = phrases[phraseIndex];
    if (forward) {
      if (charIndex < current.length) {
        typingEl.textContent += current.charAt(charIndex);
        charIndex++;
        setTimeout(typeLoop, typeSpeed);
      } else {
        forward = false;
        setTimeout(typeLoop, pauseBetween);
      }
    } else {
      if (charIndex > 0) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeLoop, Math.max(20, typeSpeed / 1.2));
      } else {
        forward = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 300);
      }
    }
  };
  // start after short delay to allow hero animation
  setTimeout(typeLoop, 900);
}

// On-scroll active nav highlighting using IntersectionObserver
try {
  const sectionElements = Array.from(document.querySelectorAll('section[id]'));
  if (sectionElements.length > 0) {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              navLinks.forEach(l => l.classList.remove('active-link'));
              link.classList.add('active-link');
            }
          });
        }
      });
    }, { threshold: 0.45 });

    sectionElements.forEach(sec => observer.observe(sec));
  }
} catch (e) {
  // fail silently if environment doesn't support IntersectionObserver
}

// Add focus trap for mobile navigation
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
};

// Initialize focus trap when mobile nav is active
mobileToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    trapFocus(navMenu);
  }
});

// Add intersection observer for counter animation
const animateCounters = () => {
  const counters = document.querySelectorAll(".stat-item .number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const increment = target / 200;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent =
          Math.ceil(current) + (counter.textContent.includes("+") ? "+" : "");
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent;
      }
    };

    updateCounter();
  });
};

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Chatbot functionality
const chatbotButton = document.getElementById("chatbot-button");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");

const responses = {
  hi: "Hello! How can I help you learn about Abhishek?",
  hello: "Hi there! Ask me about his skills, projects, or experience.",
  "what do you do":
    "I am a B.Tech (Hons) IT student specializing in Cybersecurity at PIET. I build scalable cloud solutions using AWS, Kubernetes, Terraform, Docker, and CI/CD.",
  "tell me about yourself":
    "Abhishek is a passionate Cloud & DevOps Engineer. He specializes in Cybersecurity and has expertise in AWS, Terraform, Docker, Kubernetes, and CI/CD pipelines. He has over 39 projects and multiple internships.",
  "what is your work":
    "Abhishek works on cloud infrastructure, DevOps automation, and cybersecurity projects. He has experience with AWS deployments, containerization, and monitoring tools.",
  work: "Abhishek works on cloud infrastructure, DevOps automation, and cybersecurity projects. He has experience with AWS deployments, containerization, and monitoring tools.",
  "what are your skills":
    "He excels in AWS (EC2, S3, IAM, VPC), Terraform, Docker, Kubernetes, Jenkins, GitHub Actions, Python, Bash, Linux, and more. Check the skills section for details!",
  skills:
    "He excels in AWS (EC2, S3, IAM, VPC), Terraform, Docker, Kubernetes, Jenkins, GitHub Actions, Python, Bash, Linux, and more. Check the skills section for details!",
  "what projects have you done":
    'He has over 39 projects! From AI-powered apps to cloud deployments. Visit the "All Projects" page for a full list.',
  projects:
    'He has over 39 projects! From AI-powered apps to cloud deployments. Visit the "All Projects" page for a full list.',
  "how can I contact you":
    "You can email him at abhishekmmishra09896@gmail.com, check LinkedIn, or fill the contact form on this page.",
  contact:
    "You can email him at abhishekmmishra09896@gmail.com, check LinkedIn, or fill the contact form on this page.",
  "what is your experience":
    "He has internships in Cloud (AWS), Cybersecurity (packet sniffer), and Web Development (React + Firebase). See the experience timeline.",
  experience:
    "He has internships in Cloud (AWS), Cybersecurity (packet sniffer), and Web Development (React + Firebase). See the experience timeline.",
  "what are your achievements":
    "He has NPTEL Discipline Star, Best Leadership Award, Hackathon wins, Oracle Cloud cert, and maintains 8+ CGPA.",
  achievements:
    "He has NPTEL Discipline Star, Best Leadership Award, Hackathon wins, Oracle Cloud cert, and maintains 8+ CGPA.",
  "what is your education":
    "B.Tech (Hons) IT - Cybersecurity at PIET, Kurukshetra University.",
  education:
    "B.Tech (Hons) IT - Cybersecurity at PIET, Kurukshetra University.",
  "what is your github": "My GitHub is https://github.com/Abhi-mishra998",
  github: "My GitHub is https://github.com/Abhi-mishra998",
  "what is your linkedin":
    "My LinkedIn is https://www.linkedin.com/in/abhishek-mishra-49888123b",
  linkedin:
    "My LinkedIn is https://www.linkedin.com/in/abhishek-mishra-49888123b",
  "what is your email": "My email is abhishekmmishra09896@gmail.com",
  email: "My email is abhishekmmishra09896@gmail.com",
  about:
    "Abhishek is a B.Tech (Hons) IT student specializing in Cybersecurity at PIET. He builds scalable cloud solutions using AWS, Kubernetes, Terraform, Docker, and CI/CD.",
  skills:
    "He excels in AWS (EC2, S3, IAM, VPC), Terraform, Docker, Kubernetes, Jenkins, GitHub Actions, Python, Bash, Linux, and more. Check the skills section for details!",
  projects:
    'He has over 39 projects! From AI-powered apps to cloud deployments. Visit the "All Projects" page for a full list.',
  contact:
    "You can email him at abhishekmmishra09896@gmail.com, check LinkedIn, or fill the contact form on this page.",
  experience:
    "He has internships in Cloud (AWS), Cybersecurity (packet sniffer), and Web Development (React + Firebase). See the experience timeline.",
  achievements:
    "He has NPTEL Discipline Star, Best Leadership Award, Hackathon wins, Oracle Cloud cert, and maintains 8+ CGPA.",
  education:
    "B.Tech (Hons) IT - Cybersecurity at PIET, Kurukshetra University.",
  github: "My GitHub is https://github.com/Abhi-mishra998",
  linkedin:
    "My LinkedIn is https://www.linkedin.com/in/abhishek-mishra-49888123b",
  email: "My email is abhishekmmishra09896@gmail.com",
  default:
    "I'm sorry, I'm not sure about that. Try asking about his work, skills, projects, experience, achievements, github, linkedin, or email!",
};

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const key in responses) {
    if (lowerMessage.includes(key)) {
      return responses[key];
    }
  }
  return responses["default"];
}

function addMessage(content, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${type}`;
  messageDiv.textContent = content;
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessage(message, "user");
    const response = getBotResponse(message);
    setTimeout(() => addMessage(response, "bot"), 500);
    chatbotInput.value = "";
  }
}

// Event listeners
chatbotButton.addEventListener("click", () => {
  chatbotWindow.classList.toggle("hidden");
});

chatbotClose.addEventListener("click", () => {
  chatbotWindow.classList.add("hidden");
});

chatbotSend.addEventListener("click", sendMessage);

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Initial bot message
window.addEventListener("load", () => {
  setTimeout(
    () =>
      addMessage(
        "Hi! I'm here to help you learn about Abhishek. Ask me anything!",
        "bot"
      ),
    1000
  );
});

// Make floating icons draggable (pointer events). Respects touch and mouse.
(function () {
  const container = document.querySelector('.hero-image');
  const icons = Array.from(document.querySelectorAll('.floating-icon'));
  if (!container || icons.length === 0) return;

  icons.forEach((icon) => {
    // ensure positioned relative to container
    icon.style.position = 'absolute';

    const onPointerDown = (e) => {
      e.preventDefault();
      icon.setPointerCapture(e.pointerId);
      icon.classList.add('dragging');

      const containerRect = container.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      const offsetX = e.clientX - iconRect.left;
      const offsetY = e.clientY - iconRect.top;

      const onPointerMove = (ev) => {
        const x = ev.clientX - containerRect.left - offsetX;
        const y = ev.clientY - containerRect.top - offsetY;

        // clamp inside container
        const clampedX = Math.max(0, Math.min(containerRect.width - iconRect.width, x));
        const clampedY = Math.max(0, Math.min(containerRect.height - iconRect.height, y));

        icon.style.left = clampedX + 'px';
        icon.style.top = clampedY + 'px';
        icon.style.right = 'auto';
      };

      const onPointerUp = (ev) => {
        try { icon.releasePointerCapture(e.pointerId); } catch (err) {}
        icon.classList.remove('dragging');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    icon.addEventListener('pointerdown', onPointerDown);
  });
})();
