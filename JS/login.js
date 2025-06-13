document.addEventListener('DOMContentLoaded', function() {
    // التحقق من صحة نموذج تسجيل الدخول
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // هنا يمكنك إضافة التحقق من صحة البيانات
            if (email && password) {
                // عرض رسالة تحميل
                const btn = this.querySelector('button[type="submit"]');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
                btn.disabled = true;
                
                // محاكاة عملية تسجيل الدخول
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1500);
            }
        });
    }
    
    // التحقق من صحة نموذج تسجيل السائح
    if (document.getElementById('registerUserForm')) {
        document.getElementById('registerUserForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('كلمة المرور وتأكيدها غير متطابقين');
                return;
            }
            
            // هنا يمكنك إضافة المزيد من التحقق
            const btn = this.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري إنشاء الحساب...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول');
                window.location.href = "login.html";
            }, 2000);
        });
    }
    
    // التحقق من صحة نموذج تسجيل الفندق
    if (document.getElementById('registerHotelForm')) {
        document.getElementById('registerHotelForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('كلمة المرور وتأكيدها غير متطابقين');
                return;
            }
            
            const btn = this.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تسجيل الفندق...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('تم تسجيل الفندق بنجاح! سيتم مراجعة بياناتك وإعلامك عند التفعيل');
                window.location.href = "login.html";
            }, 2000);
        });
    }
});