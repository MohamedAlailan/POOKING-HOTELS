document.addEventListener('DOMContentLoaded', function() {
    // بيانات الفنادق الافتراضية
    const hotelsData = [
        {
            id: 1,
            name: "فندق الشرق الأوسط",
            location: "الرياض",
            description: "فندق 5 نجوم في قلب العاصمة مع إطلالة رائعة",
            rating: 4.5,
            price: 450,
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            amenities: ["واي فاي مجاني", "مسبح", "صالة ألعاب رياضية", "مطعم"],
            badge: "عرض خاص"
        },
        {
            id: 2,
            name: "فندق البحر الأحمر",
            location: "جدة",
            description: "إطلالة مباشرة على البحر الأحمر مع خدمة فاخرة",
            rating: 4.2,
            price: 380,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            amenities: ["واي فاي مجاني", "مسبح", "سبا", "موقف سيارات"],
            badge: "الأكثر حجزاً"
        },
        {
            id: 3,
            name: "فندق القصيم",
            location: "بريدة",
            description: "فندق أنيق في قلب منطقة القصيم",
            rating: 4.0,
            price: 320,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            amenities: ["واي فاي مجاني", "مطعم", "موقف سيارات"],
            badge: null
        },
        {
            id: 4,
            name: "فندق المدينه",
            location: "المدينة المنورة",
            description: "على بعد خطوات من المسجد النبوي الشريف",
            rating: 4.8,
            price: 550,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            amenities: ["واي فاي مجاني", "مسبح", "صالة ألعاب رياضية", "مطعم", "موقف سيارات"],
            badge: "جديد"
        }
    ];

    // عناصر DOM
    const searchBtn = document.getElementById('searchBtn');
    const hotelsContainer = document.getElementById('hotelsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const bookingModal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-btn');
    const bookingForm = document.getElementById('bookingForm');
    const modalHotelName = document.getElementById('modalHotelName');
    const modalHotelLocation = document.getElementById('modalHotelLocation');
    const modalHotelPrice = document.getElementById('modalHotelPrice');
    const locationFilter = document.getElementById('location');
    const priceRangeFilter = document.getElementById('priceRange');
    const ratingFilter = document.getElementById('rating');
    const amenitiesFilter = document.getElementById('amenities');

    // متغيرات الحجز
    let selectedHotel = null;

    // عرض الفنادق
    function displayHotels(hotels) {
        hotelsContainer.innerHTML = '';
        
        if (hotels.length === 0) {
            hotelsContainer.innerHTML = '<p class="no-results">لا توجد فنادق متاحة تطابق معايير البحث</p>';
            return;
        }
        
        hotels.forEach(hotel => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            
            let badgeHTML = '';
            if (hotel.badge) {
                badgeHTML = `<div class="hotel-badge">${hotel.badge}</div>`;
            }
            
            const amenitiesHTML = hotel.amenities.map(amenity => 
                `<span class="amenity"><i class="fas fa-check"></i> ${amenity}</span>`
            ).join('');
            
            hotelCard.innerHTML = `
                <div class="hotel-image">
                    <img src="${hotel.image}" alt="${hotel.name}">
                    ${badgeHTML}
                </div>
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${hotel.location}</span>
                    </div>
                    <div class="hotel-amenities">
                        ${amenitiesHTML}
                    </div>
                    <div class="hotel-footer">
                        <div class="hotel-price">
                            ${hotel.price} <span>ر.س / ليلة</span>
                        </div>
                        <div class="hotel-rating">
                            <i class="fas fa-star"></i>
                            <span>${hotel.rating}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary book-btn" data-id="${hotel.id}">احجز الآن</button>
                </div>
            `;
            
            hotelsContainer.appendChild(hotelCard);
        });
        
        // تحديث عدد النتائج
        resultsCount.textContent = `${hotels.length} فنادق متاحة`;
        
        // إضافة مستمعين لأزرار الحجز
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const hotelId = parseInt(this.getAttribute('data-id'));
                selectedHotel = hotels.find(hotel => hotel.id === hotelId);
                openBookingModal(selectedHotel);
            });
        });
    }


    // تصفية الفنادق
    function filterHotels() {
        const location = locationFilter.value;
        const priceRange = priceRangeFilter.value;
        const rating = ratingFilter.value;
        const amenity = amenitiesFilter.value;
        
        let filteredHotels = hotelsData;
        
        // تصفية حسب الموقع
        if (location) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.location.includes(location)
            );
        }
        
        // تصفية حسب نطاق السعر
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filteredHotels = filteredHotels.filter(hotel => {
                if (max) {
                    return hotel.price >= min && hotel.price <= max;
                } else {
                    return hotel.price >= min;
                }
            });
        }
        
        // تصفية حسب التقييم
        if (rating) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.rating >= parseInt(rating)
            );
        }
        
        // تصفية حسب المرافق
        if (amenity) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.amenities.some(a => 
                    a.includes(amenity === 'pool' ? 'مسبح' : 
                      amenity === 'gym' ? 'رياضية' : 
                      amenity === 'spa' ? 'سبا' : '')
                )
            );
        }
        
        displayHotels(filteredHotels);
    }

    // البحث عن الفنادق
    searchBtn.addEventListener('click', filterHotels);

    // تصفية الفنادق عند تغيير الفلاتر
    [priceRangeFilter, ratingFilter, amenitiesFilter].forEach(filter => {
        filter.addEventListener('change', filterHotels);
    });

    // إغلاق النموذج
    closeBtn.addEventListener('click', closeBookingModal);
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            closeBookingModal();
        }
    });


    // عرض جميع الفنادق عند تحميل الصفحة
    displayHotels(hotelsData);
});