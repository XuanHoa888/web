/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

// Các phần tử cần thao tác:
const oTimKiem = document.getElementById("o-tim-kiem");
const list = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const cacTin = list.querySelectorAll("li");
	const tongSo = cacTin.length;
	let soHien = 0;
	cacTin.forEach((tin) => {
		if (!tin.classList.contains("an")) {
			soHien++;
		}
	});
	boDem.textContent = `Đang hiển thị ${soHien}/${tongSo} tin`;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value.toLowerCase();
	const cacTin = list.querySelectorAll("li");
	let soKhop = 0;

	cacTin.forEach((tin) => {
		const h3 = tin.querySelector("h3");
		const p = tin.querySelector("p");
		const vanBan = ((h3 ? h3.textContent : "") + " " + (p ? p.textContent : "")).toLowerCase();

		if (tuKhoa === "" || vanBan.includes(tuKhoa)) {
			tin.classList.remove("an");
			soKhop++;
		} else {
			tin.classList.add("an");
		}
	});

	if (soKhop === 0) {
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
		khongThay.classList.remove("an");
	} else {
		khongThay.classList.add("an");
	}

	capNhatBoDem();
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
list.addEventListener("click", (e) => {
	// Chỉ xử lý khi người dùng bấm vào nút Read more / Thu gọn
	if (e.target.tagName !== "BUTTON" || !e.target.classList.contains("more")) {
		return;
	}

	const li = e.target.closest("li");
	if (!li) return;
	const p = li.querySelector("p");
	if (!p) return;

	if (p.classList.contains("day-du")) {
		p.classList.remove("day-du");
		e.target.textContent = "Read more >>";
	} else {
		p.classList.add("day-du");
		e.target.textContent = "Thu gọn <<";
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;

	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe;

	const p = document.createElement("p");
	p.textContent = noiDung;

	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, nutMore);

	// Chèn vào đầu danh sách #list
	list.prepend(liMoi);

	// Sau khi đăng: xoá trắng hai ô nhập, xoá #bao-loi
	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	// Áp dụng bộ lọc hiện tại và cập nhật bộ đếm
	locTin();
});

// Cập nhật bộ đếm ngay khi trang tải xong
capNhatBoDem();
