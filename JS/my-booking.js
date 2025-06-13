document.addEventListener('DOMContentLoaded', function() {
    const bookingsList = document.getElementById('bookings-list');
    const emptyState = document.getElementById('empty-state');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const currentYear = document.getElementById('current-year');
    
    // بيانات الحجوزات
    let bookingsData = [];
    let filteredBookings = [];
    let currentFilter = 'all';
    let currentPage = 1;
    const bookingsPerPage = 5;
    
    init();
    
    function init() {
        currentYear.textContent = new Date().getFullYear();
        loadBookings();
        setupEventListeners();
    }
    
    function loadBookings() {
        // بيانات وهمية لأغراض العرض
        bookingsData = [
            {
                id: '#TR789456',
                date: '10 نوفمبر 2023',
                title: 'فندق كمبينسكي - الرياض',
                image: 'images/hotel-kempinski.jpg',
                dates: '15 - 20 نوفمبر 2023',
                guests: '2 بالغين',
                rooms: '1 غرفة',
                type: 'فندق',
                status: 'confirmed',
                price: '2,450',
                notes: 'يرجى توفير سرير إضافي للطفل'
            },
            {
                id: '#TR123456',
                date: '5 نوفمبر 2023',
                title: 'رحلة إلى دبي',
                image: 'images/dubai-trip.jpg',
                dates: '25 - 30 ديسمبر 2023',
                guests: '4 بالغين',
                class: 'الدرجة الاقتصادية',
                type: 'رحلة',
                status: 'pending',
                price: '3,850',
                notes: ''
            },
            {
                id: '#TR654321',
                date: '1 أكتوبر 2023',
                title: 'منتجع شاطئ نصف القمر - الخبر',
                image: 'images/half-moon.jpg',
                dates: '10 - 15 سبتمبر 2023',
                guests: '2 بالغين، 1 طفل',
                rooms: '1 غرفة',
                type: 'فندق',
                status: 'completed',
                price: '1,950',
                notes: ''
            },
            {
                id: '#TR321654',
                date: '20 أغسطس 2023',
                title: 'رحلة إلى إسطنبول',
                image: 'images/istanbul-trip.jpg',
                dates: '5 - 12 نوفمبر 2023',
                guests: '2 بالغين',
                class: 'الدرجة الممتازة',
                type: 'رحلة',
                status: 'cancelled',
                price: '4,200',
                notes: ''
            }
        ];
        
        filteredBookings = [...bookingsData];
        renderBookings();
    }
    
    function setupEventListeners() {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                filterBookings();
            });
        });
        
        searchInput.addEventListener('input', function() {
            filterBookings();
        });
        
        searchBtn.addEventListener('click', function() {
            filterBookings();
        });
        
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderBookings();
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderBookings();
            }
        });
    }
    
    function filterBookings() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        currentPage = 1;
        
        filteredBookings = bookingsData.filter(booking => {
            if (currentFilter !== 'all' && booking.status !== currentFilter) {
                return false;
            }
            
            if (searchTerm) {
                const matchesTitle = booking.title.toLowerCase().includes(searchTerm);
                const matchesId = booking.id.toLowerCase().includes(searchTerm);
                return matchesTitle || matchesId;
            }
            
            return true;
        });
        
        renderBookings();
    }
    
    function renderBookings() {
        const startIndex = (currentPage - 1) * bookingsPerPage;
        const endIndex = startIndex + bookingsPerPage;
        const bookingsToShow = filteredBookings.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
        
        pageInfo.textContent = `الصفحة ${currentPage} من ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        if (filteredBookings.length === 0) {
            bookingsList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        bookingsList.style.display = 'grid';
        emptyState.style.display = 'none';
        
        bookingsList.innerHTML = bookingsToShow.map(booking => `
            <div class="booking-card">
                <div class="booking-card-header">
                    <span class="booking-id">${booking.id}</span>
                    <span class="booking-date">بتاريخ: ${booking.date}</span>
                </div>
                <div class="booking-card-body">
                    <img src="${booking.image}" alt="${booking.title}" class="booking-image">
                    <div class="booking-details">
                        <h3 class="booking-title">${booking.title}</h3>
                        <div class="booking-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${booking.dates}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-user-friends"></i>
                                <span>${booking.guests}</span>
                            </div>
                            ${booking.type === 'فندق' ? 
                                `<div class="meta-item">
                                    <i class="fas fa-door-open"></i>
                                    <span>${booking.rooms}</span>
                                </div>` : 
                                `<div class="meta-item">
                                    <i class="fas fa-plane"></i>
                                    <span>${booking.class}</span>
                                </div>`
                            }
                        </div>
                        <span class="booking-status status-${booking.status}">${getStatusText(booking.status)}</span>
                        <div class="booking-price">${booking.price} ر.س</div>
                        <div class="booking-actions">
                            ${booking.status === 'pending' || booking.status === 'confirmed' ? 
                                `<button class="action-btn action-btn-secondary" onclick="cancelBooking('${booking.id.replace('#', '')}')">
                                    <i class="fas fa-times"></i> إلغاء الحجز
                                </button>` : ''
                            }
                            ${booking.status === 'completed' ? 
                                `<button class="action-btn action-btn-secondary" onclick="rateBooking('${booking.id.replace('#', '')}')">
                                    <i class="fas fa-star"></i> تقييم
                                </button>` : ''
                            }
                            ${booking.status === 'cancelled' ? 
                                `<button class="action-btn action-btn-secondary" onclick="rebook('${booking.id.replace('#', '')}')">
                                    <i class="fas fa-redo"></i> إعادة حجز
                                </button>` : ''
                            }
                            <button class="action-btn action-btn-secondary" onclick="printBooking('${booking.id.replace('#', '')}')">
                                <i class="fas fa-print"></i> طباعة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    function getStatusText(status) {
        const statusMap = {
            'confirmed': 'تم التأكيد',
            'pending': 'في انتظار التأكيد',
            'cancelled': 'ملغاة',
            'completed': 'منتهية'
        };
        return statusMap[status] || status;
    }
    
    // وظائف إدارة الحجوزات
    window.cancelBooking = function(bookingId) {
        if (confirm('هل أنت متأكد من رغبتك في إلغاء هذا الحجز؟')) {
            console.log(`إلغاء الحجز: ${bookingId}`);
            alert(`تم إلغاء الحجز ${bookingId} بنجاح`);
        }
    };
    
    window.printBooking = function(bookingId) {
        console.log(`طباعة الحجز: ${bookingId}`);
        window.print();
    };
    
    window.rateBooking = function(bookingId) {
        console.log(`تقييم الحجز: ${bookingId}`);
        window.location.href = `rate-booking.html?id=${bookingId}`;
    };
    
    window.rebook = function(bookingId) {
        console.log(`إعادة حجز: ${bookingId}`);
        window.location.href = `rebook.html?id=${bookingId}`;
    };
});