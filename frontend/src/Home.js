import {
  Button,
  FileInput,
  Label,
  Modal,
  Pagination,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useCallback, useRef, useState } from "react";
import { Search } from "react-feather";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import apiCaller from "./core/api";
import { delayLoading } from "./core/commonFuncs";
import Applies from "./main/Applies/Applies";
import { postsState } from "./reducers/postsReducer";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 10;

  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(0);

  const searchRef = useRef(null);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState({});

  const posts = useRecoilValue(
    postsState({ search, status: "published", page, page_size, order, filter })
  );

  const { items, pagination } = posts;

  const onSearch = useCallback(async (e) => {
    const value = searchRef.current.value;
    setSearch(value);
  }, []);

  const onSelect = useCallback(async (post) => {
    setIsShowModal(true);
    setPostSelected(post);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { Name, Email, File, Description } = e.target;

      if (!postSelected) {
        return;
      }

      setLoading(true);
      await delayLoading();

      const formData = new FormData();
      formData.append("Name", Name.value);
      formData.append("Email", Email.value);
      formData.append("Description", Description.value);
      formData.append("file", File.files?.[0]);
      formData.append("Post_Ref", postSelected);

      const createApply = await apiCaller("applies", "POST", {
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => res?.results)
        .finally(() => setLoading(false));

      if (createApply.data) {
        e.target.reset();
        toast.success("Ứng tuyển thành công.");
      }
    },
    [postSelected]
  );

  const onFilter = useCallback(async (e) => {
    const { value, name } = e.target;
    setFilter((prev) => {
      const newFilter = { ...prev, [name]: value };
      if (!value) {
        delete newFilter[name];
      }
      return newFilter;
    });
  }, []);

  return (
    <div className="mx-auto my-4">
      <div className="mt-4">
        <h3 className="font-medium leading-tight">Tuyển Dụng Trên Toàn Quốc</h3>
        <div className="flex justify-between">
          <span>
            Tìm thấy <strong>{pagination.total}</strong> việc làm phù hợp với
            yêu cầu của bạn.
          </span>
          <div>
            Bạn muốn đăng thông tin tuyển dụng?{" "}
            <a
              href="/posts/create"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              click vào đây.
            </a>
          </div>
          <div className="flex items-center">
            <div className="mr-2">
              <Select value={order} onChange={(o) => setOrder(o.target.value)}>
                <option value="asc">Cũ Nhất</option>
                <option value="desc">Mới Nhất</option>
              </Select>
            </div>
            <TextInput ref={searchRef} type="text" placeholder="Tìm kiếm..." />
            <div className="ml-2">
              <Button onClick={onSearch}>
                <Search size={13} />
              </Button>
            </div>
          </div>
          {/* <span>
            Trang {page} / <strong>{pagination.total}</strong> việc làm
          </span> */}
        </div>
        <div className="flex gap-2">
          <Select name="JobType" onChange={onFilter}>
            <option value="">Loại việc làm</option>
            <option>Thực tập</option>
            <option>Toàn thời gian cố định</option>
            <option>Toàn thời gian tạm thời</option>
            <option>Bán thời gian cố định</option>
            <option>Bán thời gian tạm thời</option>
            <option>Theo hợp đồng tư vấn</option>
          </Select>
          <Select name="JobLevel" onChange={onFilter}>
            <option value="">Cấp bậc</option>
            <option>Mới tốt nghiệp / thực tập</option>
            <option>Nhân viên</option>
            <option>Trưởng nhóm</option>
            <option>Trưởng phòng</option>
            <option>Phó giám đốc</option>
            <option>Giám đốc</option>
            <option>Tổng giám đốc điều hành</option>
          </Select>
          <Select name="JobExperience" onChange={onFilter}>
            <option value="">Kinh nghiệm</option>
            <option>Dưới 1 năm</option>
            <option>1 năm</option>
            <option>2 năm</option>
            <option>3 năm</option>
            <option>4 năm</option>
            <option>5 năm</option>
            <option>Trên 5 năm</option>
          </Select>
          <Select name="JobCareer" onChange={onFilter}>
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
        <Applies items={items} onSelect={onSelect} />
        <Modal show={isShowModal} onClose={() => setIsShowModal(false)}>
          <Modal.Header>Đơn ứng tuyển</Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmit}>
              <div className="mb-2 block">
                <div className="mb-1 block">
                  <Label htmlFor="Name" value="Tên" />
                </div>
                <TextInput
                  type="text"
                  name="Name"
                  required={true}
                  placeholder="Tên của bạn"
                />
              </div>
              <div className="mb-2 block">
                <div className="mb-1 block">
                  <Label htmlFor="Email" value="Email" />
                </div>
                <TextInput
                  type="email"
                  name="Email"
                  required={true}
                  placeholder="Email"
                />
              </div>
              <div className="mb-2 block">
                <div className="mb-1 block">
                  <Label htmlFor="File" value="CV" />
                </div>
                <FileInput name="File" required={true} />
              </div>
              <div className="mb-2 block">
                <div className="mb-1 block">
                  <Label htmlFor="Description" value="Mô tả" />
                </div>
                <Textarea
                  id="comment"
                  name="Description"
                  placeholder="Mô tả bản thân..."
                  required={true}
                  rows={4}
                />
              </div>
              <div className="flex gap-5 mt-6">
                <Button type="submit">
                  {loading && (
                    <div className="mr-3">
                      <Spinner size="sm" light={true} />
                    </div>
                  )}
                  Apply
                </Button>
                <Button color="gray" onClick={() => setIsShowModal(false)}>
                  Hủy
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <div className="flex justify-end mt-2">
          <Pagination
            showIcons={true}
            currentPage={pagination.page}
            totalPages={pagination.pageTotal || 1}
            onPageChange={(page) => setSearchParams({ page, page_size })}
          />
        </div>
      </div>
      <footer className="flex justify-center my-8">
        <span>Copyright @ Bản quyền thuộc về RECRUIT Việt Nam.</span>
      </footer>
    </div>
  );
}
