document.addEventListener('DOMContentLoaded', function() {
    // متغيرات الصفحة
    let currentStep = 1;
    const totalSteps = 3;
    let countdownInterval;
    let countdown = 60;
    
    // عناصر DOM
    const emailStep = document.getElementById('emailStep');
    const codeStep = document.getElementById('codeStep');
    const newPasswordStep = document.getElementById('newPasswordStep');
    const emailDisplay = document.querySelector('.email-dis