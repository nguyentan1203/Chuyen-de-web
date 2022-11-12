import React from 'react'

export default function AppliesFilter() {
  return (
    <div>
        <h2 className="text-xl font-medium leading-tight">Tuyển Dụng Việc Làm</h2>
      <form className="flex items-end gap-x-2 mt-4">
        <div className="w-2/5">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Tìm kiếm" />
          </div>
          <TextInput
            required={true}
            addon={<Search size={15} />}
            placeholder="Chức danh, từ khóa, hoặc tên công ty..."
          />
        </div>
        <div className="w-2/5">
          <div className="mb-2 block">
            <Label htmlFor="username" value="Địa điểm" />
          </div>
          <Select
            required={true}
            addon={<Navigation2 size={15} />}
            placeholder="Tỉnh hoặc thành phố..."
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <Button type="submit">Tìm việc</Button>
      </form>
      <div className="flex flex-wrap gap-2 mt-4">
        <Select required={true}>
          <option>Ngày đăng</option>
          <option>24 giờ qua</option>
          <option>3 ngày trước</option>
          <option>7 ngày qua</option>
          <option>14 ngày trước</option>
          <option>30 ngày trước</option>
        </Select>
        <Select required={true}>
          <option>Mức lương</option>
          <option>Dưới 1 triệu</option>
          <option>1 - 3 triệu</option>
          <option>3 - 5 triệu</option>
          <option>5 - 7 triệu</option>
          <option>7 - 10 triệu</option>
          <option>10 - 12 triệu</option>
          <option>12 - 15 triệu</option>
          <option>15 - 20 triệu</option>
          <option>Trên 20 triệu</option>
        </Select>
        <Select required={true}>
          <option>Loại việc làm</option>
          <option>Thực tập</option>
          <option>Loại việc làm</option>
          <option>Toàn thời gian cố định</option>
          <option>Toàn thời gian tạm thời</option>
          <option>Bán thời gian cố định</option>
          <option>Bán thời gian tạm thời</option>
          <option>Theo hợp đồng tư vấn</option>
        </Select>
        <Select required={true}>
          <option>Cấp bậc</option>
          <option>Mới tốt nghiệp / thực tập</option>
          <option>Nhân viên</option>
          <option>Trưởng nhóm</option>
          <option>Trưởng phòng</option>
          <option>Phó giám đốc</option>
          <option>Giám đốc</option>
          <option>Tổng giám đốc điều hành</option>
        </Select>
        <Select required={true}>
          <option>Kinh nghiệm</option>
          <option>Dưới 1 năm</option>
          <option>1 năm</option>
          <option>2 năm</option>
          <option>3 năm</option>
          <option>4 năm</option>
          <option>5 năm</option>
          <option>Trên 5 năm</option>
        </Select>
        <Select required={true}>
          <option>Ngành nghề</option>
          <option>Bán hàng</option>
          <option>Biên tập/ Báo chí/ Truyền hình</option>
          <option>Bảo hiểm/ Tư vấn bảo hiểm</option>
          <option>Bảo vệ/ An ninh/ Vệ sỹ</option>
          <option>Phiên dịch/ Ngoại ngữ</option>
          <option>Bưu chính</option>
          <option>Chứng khoán - Vàng</option>
          <option>Cơ khí - Chế tạo</option>
          <option>Công chức - Viên chức</option>
          <option>Công nghệ cao</option>
          <option>Công nghiệp</option>
          <option>Dầu khí - Hóa chất</option>
          <option>Dệt may - Da giày</option>
          <option>Dịch vụ</option>
          <option>Du lịch</option>
          <option>Đầu tư</option>
          <option>Điện - Điện tử - Điện lạnh</option>
          <option>Điện tử viễn thông</option>
          <option>Freelance</option>
          <option>Games</option>
          <option>Giáo dục - Đào tạo</option>
          <option>Giao nhận/ Vận chuyển/ Kho bãi</option>
          <option>Hàng gia dụng</option>
          <option>Hàng hải</option>
          <option>Hàng không</option>
          <option>Hành chính - Văn phòng</option>
          <option>Hóa học - Sinh học</option>
          <option>Hoạch định - Dự án</option>
          <option>IT phần cứng/mạng</option>
          <option>IT phần mềm</option>
          <option>In ấn - Xuất bản</option>
          <option>Kế toán - Kiểm toán</option>
          <option>Khách sạn - Nhà hàng</option>
          <option>Kiến trúc - Thiết kế nội thất</option>
          <option>Bất động sản</option>
          <option>Kỹ thuật</option>
          <option>Kỹ thuật ứng dụng</option>
          <option>Làm bán thời gian</option>
          <option>Làm đẹp/ Thể lực/ Spa</option>
          <option>Lao động phổ thông</option>
          <option>Lương cao</option>
          <option>Marketing - PR</option>
          <option>Môi trường</option>
          <option>Mỹ phẩm - Trang sức</option>
          <option>Phi chính phủ/ Phi lợi nhuận</option>
          <option>Ngân hàng/ Tài Chính</option>
          <option>Ngành nghề khác</option>
          <option>Nghệ thuật - Điện ảnh</option>
          <option>Người giúp việc/ Phục vụ/ Tạp vụ</option>
          <option>Nhân sự</option>
          <option>Nhân viên kinh doanh</option>
          <option>Nông - Lâm - Ngư nghiệp</option>
          <option>Ô tô - Xe máy</option>
          <option>Pháp luật/ Pháp lý</option>
          <option>Phát triển thị trường</option>
          <option>Promotion Girl/ Boy (PG-PB)</option>
          <option>QA-QC/ Thẩm định/ Giám định</option>
          <option>Quan hệ đối ngoại</option>
          <option>Quản trị kinh doanh</option>
          <option>Sinh viên làm thêm</option>
          <option>Startup</option>
          <option>Thể dục/ Thể thao</option>
          <option>Thiết kế - Mỹ thuật</option>
          <option>Thiết kế đồ họa - Web</option>
          <option>Thời trang</option>
          <option>Thủ công mỹ nghệ</option>
          <option>Thư ký - Trợ lý</option>
          <option>Thực phẩm - Đồ uống</option>
          <option>Thực tập</option>
          <option>Thương mại điện tử</option>
          <option>Tiếp thị - Quảng cáo</option>
          <option>Tổ chức sự kiện - Quà tặng</option>
          <option>Tư vấn/ Chăm sóc khách hàng</option>
          <option>Vận tải - Lái xe/ Tài xế</option>
          <option>Nhân viên trông quán internet</option>
          <option>Vật tư/Thiết bị/Mua hàng</option>
          <option>Việc làm cấp cao</option>
          <option>Việc làm Tết</option>
          <option>Xây dựng</option>
          <option>Xuất - Nhập khẩu</option>
          <option>Xuất khẩu lao động</option>
          <option>Y tế - Dược</option>
          <option>Trắc Địa / Địa Chất</option>
          <option>Người Nước Ngoài/Việt Kiều</option>
        </Select>
      </div>
    </div>
  )
}
