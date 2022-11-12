import { Select, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../reducers/authReducer";
import { postState } from "../../reducers/postsReducer";

Quill.register(Quill.import("attributors/style/direction"), true);
Quill.register(Quill.import("attributors/style/align"), true);

export const Container = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ color: [] }, { background: [] }],
  ["link", "image", "video"],
  ["clean"],
];

export default function PostsView() {
  const formRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useRecoilValue(authState);
  const post = useRecoilValue(postState(id));

  const [editor, setEditor] = useState({
    Content: "",
    RequireContent: "",
    BenefitContent: "",
  });

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
    if (!auth) {
      navigate("/sign-in");
    }
  }, [auth, id, navigate]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.Title.value = post?.Title;
      formRef.current.JobSalary.value = post?.JobSalary;
      formRef.current.JobType.value = post?.JobType;
      formRef.current.JobLevel.value = post?.JobLevel;
      formRef.current.JobExperience.value = post?.JobExperience;
      formRef.current.JobCareer.value = post?.JobCareer;
      setEditor({
        Content: post?.Content,
        RequireContent: post?.RequireContent,
        BenefitContent: post?.BenefitContent,
      });
    }
  }, [formRef, post]);

  return (
    <form ref={formRef}>
      <h5 className="font-bold capitalize mb-4">Chi Tiết công việc</h5>
      <TextInput
        type="text"
        name="Title"
        placeholder="Tiêu đề công việc..."
        required={true}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        <TextInput
          type="number"
          name="JobSalary"
          placeholder="Mức lương (VNĐ)"
          required={true}
        />
        <Select name="JobType" required={true}>
          <option value="">Loại việc làm</option>
          <option>Thực tập</option>
          <option>Toàn thời gian cố định</option>
          <option>Toàn thời gian tạm thời</option>
          <option>Bán thời gian cố định</option>
          <option>Bán thời gian tạm thời</option>
          <option>Theo hợp đồng tư vấn</option>
        </Select>
        <Select name="JobLevel" required={true}>
          <option value="">Cấp bậc</option>
          <option>Mới tốt nghiệp / thực tập</option>
          <option>Nhân viên</option>
          <option>Trưởng nhóm</option>
          <option>Trưởng phòng</option>
          <option>Phó giám đốc</option>
          <option>Giám đốc</option>
          <option>Tổng giám đốc điều hành</option>
        </Select>
        <Select name="JobExperience" required={true}>
          <option value="">Kinh nghiệm</option>
          <option>Dưới 1 năm</option>
          <option>1 năm</option>
          <option>2 năm</option>
          <option>3 năm</option>
          <option>4 năm</option>
          <option>5 năm</option>
          <option>Trên 5 năm</option>
        </Select>
        <Select name="JobCareer" required={true}>
          <option value="">Ngành nghề</option>
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
      <ReactQuill
        theme="snow"
        placeholder="Mô tả công việc"
        modules={{
          toolbar: { container: Container },
        }}
        className="h-height-100 mt-4"
        value={editor.Content}
        onChange={(value) => setEditor((prev) => ({ ...prev, Content: value }))}
      />
      <ReactQuill
        theme="snow"
        placeholder="Yêu cầu công việc"
        modules={{
          toolbar: { container: Container },
        }}
        className="h-height-100 mt-4"
        value={editor.RequireContent}
        onChange={(value) =>
          setEditor((prev) => ({ ...prev, RequireContent: value }))
        }
      />
      <ReactQuill
        theme="snow"
        placeholder="Quyền lợi chi tiết"
        modules={{
          toolbar: { container: Container },
        }}
        className="h-height-100 mt-4"
        value={editor.BenefitContent}
        onChange={(value) =>
          setEditor((prev) => ({ ...prev, BenefitContent: value }))
        }
      />
    </form>
  );
}
