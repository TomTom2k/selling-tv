let footer = document.querySelector('footer');
import tags from '../data/tags.json' assert { type: 'json' };

footer.innerHTML = `
    <div class="footer1">
        <a href="./index.html" class="logo">
            <p class="text-left"><span>S</span>mart</p>
            <p class="text-right">&emsp;<span>S</span>hop</p>
        </a>

        <ul class="list-pages">
            <a href="./index.html">
                <h3>Trang chủ</h3>
                <ul class="items">
                    <li>Sự kiện nổi bật</li>
                    <li>Sản phẩm được mua nhiều nhất</li>
                    <li>Sản phẩm mới</li>
                </ul>
            </a>
            <a href="./category.html" id="category">
                <h3>Danh sách</h3>
                <ul class="items">
                    <li>Bánh cupcake</li>
                    <li>Bánh su kem</li>
                    <li>Bánh mì ngọt</li>
                    <li>Bánh kem</li>
                    <li>Bánh donut</li>
                    <li>Bánh táo</li>
                    <li>...</li>
                    
                </ul>
            </a>
            <a href="./contact.html">
                <h3>Liên hệ</h3>
                <ul class="items">
                    <li>
                        <p>Hotline1: <span>1234567890</span></p>
                    </li>
                    <li>
                        <p>Hotline2: <span>1234567890</span></p>
                    </li>
                </ul>
            </a>
            <a href="./introduce.htm">
                <h3>Giới thiệu</h3>
            </a>
            <a href="./sitemap.html">
                <h3>SiteMap</h3>
            </a>
        </ul>

    </div>
    <div class="footer2">
        <div class="media">
            <a href="https://www.google.com/"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.google.com/"><i class="fa-brands fa-tiktok"></i></a>
            <a href="https://www.google.com/"><i class="fa-brands fa-instagram"></i></a>
        </div>
        <div class="footer-text">
            <p>Làm việc: 6:00 am - 10:00 pm</p>
            <span>Địa chỉ: 123/4 Đỗ Nhuận, p.Linh Trung, tp.Thủ Đức</span>
        </div>
    </div>
    `;

let renderCategory = (data) => {
	let category = footer.querySelector('#category .items');
	let textCategory = data.map((tag, index) =>
		index < 5 ? `<li>${tag.name}</li>` : ''
	);
	textCategory = textCategory.join('');
	if (data.length > 5) textCategory = textCategory + '<li>...</li>';
	category.innerHTML = textCategory;
};

renderCategory(tags);
