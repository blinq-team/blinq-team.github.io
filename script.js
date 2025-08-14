document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const navLinks = document.querySelectorAll('.nav-links a');

  // EmailJS 초기화
  (function() {
    emailjs.init("YOUR_USER_ID"); // EmailJS 사용자 ID를 여기에 입력하세요
  })();



  // 부드러운 스크롤
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 스크롤 감지 및 활성 상태 관리
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 스크롤 이벤트 리스너
  window.addEventListener('scroll', updateActiveNavLink);
  
  // 초기 활성 상태 설정
  updateActiveNavLink();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 로딩 상태 표시
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;
    
    // 간단한 유효성 검사
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    if (!name || !email || !message) {
      formMessage.textContent = '모든 항목을 입력해주세요!';
      formMessage.style.color = '#e74c3c';
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }

    // EmailJS를 사용하여 이메일 전송
    const templateParams = {
      to_email: 'kim93yohan@gmail.com',
      from_name: name,
      from_email: email,
      message: message,
      subject: `Blinq 웹사이트 문의 - ${name}님으로부터`
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formMessage.textContent = '메시지가 성공적으로 전송되었습니다!';
        formMessage.style.color = '#0afcc4';
        form.reset();
      }, function(error) {
        console.log('FAILED...', error);
        formMessage.textContent = '메시지 전송에 실패했습니다. 다시 시도해주세요.';
        formMessage.style.color = '#e74c3c';
      })
      .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}); 