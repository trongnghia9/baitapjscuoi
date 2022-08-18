var dsnv = new DanhSachNhanVien();

var validation = new Validation();
function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}
function getLocalStorage() {
    if (localStorage.getItem("DSNV") != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
    }
    hienthiDS(dsnv.mangNV);
}
getLocalStorage();
// thêm nhân viên       
function themNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var hoVaTen = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    // to check if input is valid
    var isValid = true;

    //? check tài khoản
    isValid &=
        validation.checkEmpty(taiKhoan, "tbTKNV", "Vui lòng nhập tài khoản") &&
        validation.checkNumber(
            taiKhoan,
            "tbTKNV",
            "Tài khoản không đúng vui lòng nhập lại"
        ) &&
        validation.checkDoDai(
            taiKhoan,
            4,
            6,
            "tbTKNV",
            "Độ dài tối đa 4-6 số "
        ) &&
        validation.checkID(taiKhoan, "tbTKNV", "Tài khoản đã tồn tại", dsnv.mangNV);

    //? check họ tên
    isValid &=
        validation.checkEmpty(hoVaTen, "tbTen", "Vui lòng nhập họ và tên") &&
        validation.checkName(hoVaTen, "tbTen", "Tên NV phải là ký tự chữ");

    //? check email
    isValid &=
        validation.checkEmpty(email, "tbEmail", "Vui lòng nhập email") &&
        validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //? check mật khẩu
    isValid &=
        validation.checkEmpty(password, "password", "Vui lòng nhập mật khẩu") &&
        validation.checkPass(
            password,
            "password",
            "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt tối đa 6-10 ký tự"
        );

    //? check ngày làm
    isValid &=
        validation.checkEmpty(ngayLam, "tbNgay", "Vui lòng nhập ngày làm") &&
        validation.checkDate(ngayLam, "tbNgay", "Nhập đúng định dạng mm/dd/yyyy");

    //? check lương
    isValid &=
        validation.checkEmpty(luongCB, "tbLuongCB", "Vui lòng nhập mức lương") &&
        validation.checkLuong(luongCB, "tbLuongCB", "Lương không đúng định dạng");
    //? check chức vụ
    isValid &= validation.checkDropDown(
        "chucvu",
        "tbChucVu",
        "Vui lòng chọn chức vụ"
    );
    //? check giờ làm
    isValid &=
        validation.checkEmpty(gioLam, "tbGiolam", "Vui lòng nhập giờ làm") &&
        validation.checkGioLam(
            gioLam,
            "tbGiolam",
            "Giờ làm là số và tối thiếu từ 80H-200H"
        );
    if (isValid) {
       
        var nv = new NhanVien(
            taiKhoan,
            hoVaTen,
            email,
            password,
            ngayLam,
            Number(luongCB),
            chucVu,
            Number(gioLam)
        );
        nv.tinhLuong();
        nv.xepLoai();

        dsnv.themNV(nv);

        hienthiDS(dsnv.mangNV);

        setLocalStorage();

        resetForm();
    }
}
getELE("btnThemNV").onclick = themNhanVien;

function hienthiDS(mangNV) {
    var content = "";
    mangNV.map(function (nv, index) {
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoVaTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="xemChiTiet('${nv.taiKhoan}')">Xem</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
            </td>
        </tr>
        `;
    });
    getELE("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(tKhoan) {
    dsnv.xoaNV(tKhoan);
    hienthiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

function xemChiTiet(tKhoan) {
    var viTri = dsnv.timViTri(tKhoan);
    if (viTri > -1) {
        var nvTim = dsnv.mangNV[viTri];
        getELE("tknv").value = nvTim.taiKhoan;
        getELE("tknv").disabled = true;
        getELE("name").value = nvTim.hoVaTen;
        getELE("email").value = nvTim.email;
        getELE("password").value = nvTim.password;
        getELE("datepicker").value = nvTim.ngayLam;
        getELE("luongCB").value = nvTim.luongCB;
        getELE("chucvu").value = nvTim.chucVu;
        getELE("gioLam").value = nvTim.gioLam;
    }
}

function capNhatNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var hoVaTen = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    // Validation
    var isValid = true;
    isValid &=
        validation.checkEmpty(taiKhoan, "tbTKNV", "Vui lòng nhập tài khoản") &&
        validation.checkNumber(
            taiKhoan,
            "tbTKNV",
            "Tài khoản không đúng định dạng"
        );

    //?  họvàtên
    isValid &=
        validation.checkEmpty(hoVaTen, "tbTen", "Vui lòng nhập họ và tên") &&
        validation.checkName(hoVaTen, "tbTen", "Tên NV phải là ký tự chữ");

    //?  email
    isValid &=
        validation.checkEmpty(email, "tbEmail", "Vui lòng nhập email") &&
        validation.checkEmail(email, "tbEmail", "Email không đúng định dạng");

    //?  mật khẩu
    isValid &=
        validation.checkEmpty(password, "password", "Vui lòng nhập mật khẩu") &&
        validation.checkPass(
            password,
            "password",
            "Pass chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt tối đa 6-10 ký tự"
        );

    //?  ngày làm
    isValid &=
        validation.checkEmpty(ngayLam, "tbNgay", "Vui lòng nhập ngày làm") &&
        validation.checkDate(ngayLam, "tbNgay", "Nhập đúng định dạng dd/mm/yyyy");

    //?  lương
    isValid &=
        validation.checkEmpty(luongCB, "tbLuongCB", "Vui lòng nhập mức lương") &&
        validation.checkLuong(luongCB, "tbLuongCB", "Lương không đúng định dạng");
    //?  chức vụ
    isValid &= validation.checkDropDown(
        "chucvu",
        "tbChucVu",
        "Vui lòng chọn chức vụ"
    );
    // ?  giờ làm
    isValid &=
        validation.checkEmpty(gioLam, "tbGiolam", "Vui lòng nhập giờ làm ") &&
        validation.checkGioLam(
            gioLam,
            "tbGiolam",
            "Giờ làm là ký số và tối thiếu từ 80h-200h"
        );
    if (isValid) {
        // (Instance)
        var nv = new NhanVien(
            taiKhoan,
            hoVaTen,
            email,
            password,
            ngayLam,
            Number(luongCB),
            chucVu,
            Number(gioLam)
        );
        nv.tinhLuong();
        nv.xepLoai();

        dsnv.capNhatNV(nv);

        hienthiDS(dsnv.mangNV);

        setLocalStorage(dsnv.mangNV);

        resetForm();
        getELE("btnCapNhat").classList.add("data-dismiss");
    }

}
getELE("btnCapNhat").onclick = capNhatNhanVien;

function resetForm() {
    document.querySelector("form").reset();
    getELE("chucvu").selectedIndex = 0;
    getELE("tknv").disabled = false;
}

function timKiemNhanVienTheoLoai() {
    var tuKhoa = getELE('searchName').value;
    var mangTK = dsnv.timKiem(tuKhoa.trim());
    hienthiDS(mangTK);
}
getELE('btnTimNV').onclick = timKiemNhanVienTheoLoai;

getELE("searchName").onkeyup = timKiemNhanVienTheoLoai;