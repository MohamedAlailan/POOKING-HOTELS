document.addEventListener('DOMContentLoaded', function() {
    // إدارة القائمة المنسدلة للمستخدم
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.dropdown-content');
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
    
    // تسجيل الخروج
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                window.location.href = 'login.html';
            }
        });
    }
    
    // تصفية الوجهات
    const filterForm = document.querySelector('.filter-box');
    if (filterForm) {
        const filterBtn = filterForm.querySelector('.btn-primary');
        
        filterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const continent = document.getElementById('continent').value;
            const season = document.getElementById('season').value;
            const budget = document.getElementById('budget').value;
            
            console.log('تصفية حسب:', {continent, season, budget});
            
            filterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التصفية...';
            
            // محاكاة عملية التصفية
            setTimeout(() => {
                filterBtn.innerHTML = '<i class="fas fa-filter"></i> تصفية النتائج';
                alert('تم تطبيق عوامل التصفية بنجاح');
            }, 1500);
        });
    }
    
    // تأثيرات التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    let isLoading = false;
    
    window.addEventListener('scroll', function() {
        if (isLoading) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreDestinations();
        }
    });
    
    function loadMoreDestinations() {
        isLoading = true;
        
        // عرض مؤشر تحميل
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري تحميل المزيد من الوجهات...';
        document.querySelector('.destinations-grid-section').appendChild(loader);
        
        // محاكاة جلب البيانات من الخادم
        setTimeout(() => {
            console.log('تم تحميل المزيد من الوجهات');
            
            // إزالة مؤشر التحميل
            loader.remove();
            isLoading = false;
        }, 2000);
    }
});