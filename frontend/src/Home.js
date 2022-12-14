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
        toast.success("???ng tuy???n th??nh c??ng.");
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
        <h3 className="font-medium leading-tight">Tuy???n D???ng Tr??n To??n Qu???c</h3>
        <div className="flex justify-between">
          <span>
            T??m th???y <strong>{pagination.total}</strong> vi???c l??m ph?? h???p v???i
            y??u c???u c???a b???n.
          </span>
          <div>
            B???n mu???n ????ng th??ng tin tuy???n d???ng?{" "}
            <a
              href="/posts/create"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600"
            >
              click v??o ????y.
            </a>
          </div>
          <div className="flex items-center">
            <div className="mr-2">
              <Select value={order} onChange={(o) => setOrder(o.target.value)}>
                <option value="asc">C?? Nh???t</option>
                <option value="desc">M???i Nh???t</option>
              </Select>
            </div>
            <TextInput ref={searchRef} type="text" placeholder="T??m ki???m..." />
            <div className="ml-2">
              <Button onClick={onSearch}>
                <Search size={13} />
              </Button>
            </div>
          </div>
          {/* <span>
            Trang {page} / <strong>{pagination.total}</strong> vi???c l??m
          </span> */}
        </div>
        <div className="flex gap-2">
          <Select name="JobType" onChange={onFilter}>
            <option value="">Lo???i vi???c l??m</option>
            <option>Th???c t???p</option>
            <option>To??n th???i gian c??? ?????nh</option>
            <option>To??n th???i gian t???m th???i</option>
            <option>B??n th???i gian c??? ?????nh</option>
            <option>B??n th???i gian t???m th???i</option>
            <option>Theo h???p ?????ng t?? v???n</option>
          </Select>
          <Select name="JobLevel" onChange={onFilter}>
            <option value="">C???p b???c</option>
            <option>M???i t???t nghi???p / th???c t???p</option>
            <option>Nh??n vi??n</option>
            <option>Tr?????ng nh??m</option>
            <option>Tr?????ng ph??ng</option>
            <option>Ph?? gi??m ?????c</option>
            <option>Gi??m ?????c</option>
            <option>T???ng gi??m ?????c ??i???u h??nh</option>
          </Select>
          <Select name="JobExperience" onChange={onFilter}>
            <option value="">Kinh nghi???m</option>
            <option>D?????i 1 n??m</option>
            <option>1 n??m</option>
            <option>2 n??m</option>
            <option>3 n??m</option>
            <option>4 n??m</option>
            <option>5 n??m</option>
            <option>Tr??n 5 n??m</option>
          </Select>
          <Select name="JobCareer" onChange={onFilter}>
            <option value="">Ng??nh ngh???</option>
            <option>B??n h??ng</option>
            <option>Bi??n t???p/ B??o ch??/ Truy???n h??nh</option>
            <option>B???o hi???m/ T?? v???n b???o hi???m</option>
            <option>B???o v???/ An ninh/ V??? s???</option>
            <option>Phi??n d???ch/ Ngo???i ng???</option>
            <option>B??u ch??nh</option>
            <option>Ch???ng kho??n - V??ng</option>
            <option>C?? kh?? - Ch??? t???o</option>
            <option>C??ng ch???c - Vi??n ch???c</option>
            <option>C??ng ngh??? cao</option>
            <option>C??ng nghi???p</option>
            <option>D???u kh?? - H??a ch???t</option>
            <option>D???t may - Da gi??y</option>
            <option>D???ch v???</option>
            <option>Du l???ch</option>
            <option>?????u t??</option>
            <option>??i???n - ??i???n t??? - ??i???n l???nh</option>
            <option>??i???n t??? vi???n th??ng</option>
            <option>Freelance</option>
            <option>Games</option>
            <option>Gi??o d???c - ????o t???o</option>
            <option>Giao nh???n/ V???n chuy???n/ Kho b??i</option>
            <option>H??ng gia d???ng</option>
            <option>H??ng h???i</option>
            <option>H??ng kh??ng</option>
            <option>H??nh ch??nh - V??n ph??ng</option>
            <option>H??a h???c - Sinh h???c</option>
            <option>Ho???ch ?????nh - D??? ??n</option>
            <option>IT ph???n c???ng/m???ng</option>
            <option>IT ph???n m???m</option>
            <option>In ???n - Xu???t b???n</option>
            <option>K??? to??n - Ki???m to??n</option>
            <option>Kh??ch s???n - Nh?? h??ng</option>
            <option>Ki???n tr??c - Thi???t k??? n???i th???t</option>
            <option>B???t ?????ng s???n</option>
            <option>K??? thu???t</option>
            <option>K??? thu???t ???ng d???ng</option>
            <option>L??m b??n th???i gian</option>
            <option>L??m ?????p/ Th??? l???c/ Spa</option>
            <option>Lao ?????ng ph??? th??ng</option>
            <option>L????ng cao</option>
            <option>Marketing - PR</option>
            <option>M??i tr?????ng</option>
            <option>M??? ph???m - Trang s???c</option>
            <option>Phi ch??nh ph???/ Phi l???i nhu???n</option>
            <option>Ng??n h??ng/ T??i Ch??nh</option>
            <option>Ng??nh ngh??? kh??c</option>
            <option>Ngh??? thu???t - ??i???n ???nh</option>
            <option>Ng?????i gi??p vi???c/ Ph???c v???/ T???p v???</option>
            <option>Nh??n s???</option>
            <option>Nh??n vi??n kinh doanh</option>
            <option>N??ng - L??m - Ng?? nghi???p</option>
            <option>?? t?? - Xe m??y</option>
            <option>Ph??p lu???t/ Ph??p l??</option>
            <option>Ph??t tri???n th??? tr?????ng</option>
            <option>Promotion Girl/ Boy (PG-PB)</option>
            <option>QA-QC/ Th???m ?????nh/ Gi??m ?????nh</option>
            <option>Quan h??? ?????i ngo???i</option>
            <option>Qu???n tr??? kinh doanh</option>
            <option>Sinh vi??n l??m th??m</option>
            <option>Startup</option>
            <option>Th??? d???c/ Th??? thao</option>
            <option>Thi???t k??? - M??? thu???t</option>
            <option>Thi???t k??? ????? h???a - Web</option>
            <option>Th???i trang</option>
            <option>Th??? c??ng m??? ngh???</option>
            <option>Th?? k?? - Tr??? l??</option>
            <option>Th???c ph???m - ????? u???ng</option>
            <option>Th???c t???p</option>
            <option>Th????ng m???i ??i???n t???</option>
            <option>Ti???p th??? - Qu???ng c??o</option>
            <option>T??? ch???c s??? ki???n - Qu?? t???ng</option>
            <option>T?? v???n/ Ch??m s??c kh??ch h??ng</option>
            <option>V???n t???i - L??i xe/ T??i x???</option>
            <option>Nh??n vi??n tr??ng qu??n internet</option>
            <option>V???t t??/Thi???t b???/Mua h??ng</option>
            <option>Vi???c l??m c???p cao</option>
            <option>Vi???c l??m T???t</option>
            <option>X??y d???ng</option>
            <option>Xu???t - Nh???p kh???u</option>
            <option>Xu???t kh???u lao ?????ng</option>
            <option>Y t??? - D?????c</option>
            <option>Tr???c ?????a / ?????a Ch???t</option>
            <option>Ng?????i N?????c Ngo??i/Vi???t Ki???u</option>
          </Select>
        </div>
        <Applies items={items} onSelect={onSelect} />
        <Modal show={isShowModal} onClose={() => setIsShowModal(false)}>
          <Modal.Header>????n ???ng tuy???n</Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmit}>
              <div className="mb-2 block">
                <div className="mb-1 block">
                  <Label htmlFor="Name" value="T??n" />
                </div>
                <TextInput
                  type="text"
                  name="Name"
                  required={true}
                  placeholder="T??n c???a b???n"
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
                  <Label htmlFor="Description" value="M?? t???" />
                </div>
                <Textarea
                  id="comment"
                  name="Description"
                  placeholder="M?? t??? b???n th??n..."
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
                  H???y
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
        <span>Copyright @ B???n quy???n thu???c v??? RECRUIT Vi???t Nam.</span>
      </footer>
    </div>
  );
}
