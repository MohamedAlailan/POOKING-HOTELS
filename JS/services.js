document.addEventListener('DOMContentLoaded', function() {
  // متغيرات السلة
  let cart = [];
  let totalPrice = 0;
  
  // عناصر DOM
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('checkout-btn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  // تصفية الخدمات حسب التبويب
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          // إزالة التنشيط من جميع الأزرار
          tabButtons.forEach(btn => btn.classList.remove('active'));
          // تنشيط الزر المحدد
          this.classList.add('active');
          
          const category = this.getAttribute('data-category');
          
          // تصفية الخدمات
          serviceCards.forEach(card => {
              if (category === 'all' || card.getAttribute('data-category') === category) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });
  
  // إضافة خدمة إلى السلة
  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
          const serviceId = this.getAttribute('data-service');
          const serviceCard = this.closest('.service-card');
          const serviceName = serviceCard.querySelector('h3').textContent;
          const servicePrice = parseFloat(serviceCard.querySelector('.current-price').textContent.replace('$', ''));
          const servicePer = serviceCard.querySelector('.per-service').textContent;
          
          // التحقق مما إذا كانت الخدمة موجودة بالفعل في السلة
          const existingItem = cart.find(item => item.id === serviceId);
          
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({
                  id: serviceId,
                  name: serviceName,
                  price: servicePrice,
                  per: servicePer,
                  quantity: 1
              });
          }
          
          // تحديث السعر الإجمالي
          totalPrice += servicePrice;
          
          // تحديث عرض السلة
          updateCartDisplay();
          
          // إظهار رسالة تأكيد
          showToast(`تم إضافة "${serviceName}" إلى السلة`);
      });
  });
  
  // تحديث عرض السلة
  function updateCartDisplay() {
      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p class="empty-cart">سلة الخدمات فارغة</p>';
          cartTotalPrice.textContent = '$0';
          checkoutBtn.disabled = true;
          return;
      }
      
      checkoutBtn.disabled = false;
      
      let cartHTML = '';
      cart.forEach(item => {
          cartHTML += `
              <div class="cart-item" data-id="${item.id}">
                  <div class="item-info">
                      <h4>${item.name}</h4>
                      <span class="item-price">$${item.price} ${item.per}</span>
                  </div>
                  <div class="item-controls">
                      <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                      <span class="item-quantity">${item.quantity}</span>
                      <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                      <button class="remove-btn"><i class="fas fa-trash"></i></button>
                  </div>
              </div>
          `;
      });
      
      cartItemsContainer.innerHTML = cartHTML;
      cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
      
      // إضافة معالجات الأحداث للعناصر الجديدة
      setupCartItemEvents();
  }
  
  // إعداد معالجات الأحداث لعناصر السلة
  function setupCartItemEvents() {
      document.querySelectorAll('.decrease').forEach(btn => {
          btn.addEventListener('click', function() {
              const itemId = this.closest('.cart-item').getAttribute('data-id');
              const item = cart.find(item => item.id === itemId);
              
              if (item.quantity > 1) {
                  item.quantity -= 1;
                  totalPrice -= item.price;
              } else {
                  // إذا كانت الكمية 1، إزالة العنصر من السلة
                  totalPrice -= item.price;
                  cart = cart.filter(item => item.id !== itemId);
              }
              
              updateCartDisplay();
          });
      });
      
      document.querySelectorAll('.increase').forEach(btn => {
          btn.addEventListener('click', function() {
              const itemId = this.closest('.cart-item').getAttribute('data-id');
              const item = cart.find(item => item.id === itemId);
              
              item.quantity += 1;
              totalPrice += item.price;
              
              updateCartDisplay();
          });
      });
      
      document.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', function() {
              const itemId = this.closest('.cart-item').getAttribute('data-id');
              const item = cart.find(item => item.id === itemId);
              
              totalPrice -= (item.price * item.quantity);
              cart = cart.filter(item => item.id !== itemId);
              
              updateCartDisplay();
          });
      });
  }
  
  // معالجة عملية الدفع
  checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) return;
      
      // هنا يمكنك إضافة منطق إتمام الشراء
      // مثل إرسال البيانات إلى الخادم أو توجيه المستخدم إلى صفحة الدفع
      
      // لأغراض العرض، سنظهر رسالة تأكيد
      showToast('جاري توجيهك إلى صفحة الدفع...', 'success');
      
      // يمكنك إضافة تأخير لمحاكاة عملية التوجيه
      setTimeout(() => {
          // localStorage.setItem('phoenix_cart', JSON.stringify(cart));
          // window.location.href = 'checkout.html';
          
          // لأغراض العرض، سنقوم فقط بإفراغ السلة
          cart = [];
          totalPrice = 0;
          updateCartDisplay();
          showToast('تم إتمام عملية الشراء بنجاح!', 'success');
      }, 2000);
  });
  
  // وظيفة لعرض رسائل التأكيد
  function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      document.body.appendChild(toast);
      
      setTimeout(() => {
          toast.classList.add('show');
      }, 10);
      
      setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
              document.body.removeChild(toast);
          }, 300);
      }, 3000);
  }
  
  // تهيئة السلة عند التحميل
  updateCartDisplay();
});