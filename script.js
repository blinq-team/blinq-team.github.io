document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // 간단한 유효성 검사
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      formMessage.textContent = '모든 항목을 입력해주세요!';
      formMessage.style.color = '#e74c3c';
      return;
    }
    // 성공 메시지
    formMessage.textContent = 'Thank you! Your submission has been received!';
    formMessage.style.color = '#2d5fff';
    form.reset();
  });
}); 