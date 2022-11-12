import {
  Button,
  FileInput,
  Label,
  Modal,
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
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const page_size = searchParams.get("page_size") || 10;

  const [loading, setLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [postSelected, setPostSelected] = useState(0);

  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  const posts = useRecoilValue(
    postsState({ search, status: "published", page, page_size })
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

        {/* <div className="flex justify-center mt-4">
          <Pagination
            currentPage={pagination.page}
            showIcons={true}
            totalPages={pagination.pageTotal}
          />
        </div> */}
      </div>
      <footer className="flex justify-center my-8">
        <span>Copyright @ Bản quyền thuộc về Nhóm F.</span>
      </footer>
    </div>
  );
}
