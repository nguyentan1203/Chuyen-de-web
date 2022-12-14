import { Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import apiCaller from "../../core/api";
import { delayLoading } from "../../core/commonFuncs";
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

export default function PostsUpdate() {
  const formRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = useRecoilValue(authState);
  const post = useRecoilValue(postState(id));

  const [loading, setLoading] = useState(false);

  const [editor, setEditor] = useState({
    Content: "",
    RequireContent: "",
    BenefitContent: "",
  });

  useEffect(() => {
    if (!auth) {
      navigate("/sign-in");
    }
  }, [auth, navigate]);

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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setLoading(true);
      await delayLoading();

      const { Content, RequireContent, BenefitContent } = editor;
      const { Title, JobSalary, JobType, JobLevel, JobExperience, JobCareer } =
        e.target;

      const data = {
        Title: Title.value,
        JobSalary: JobSalary.value,
        JobType: JobType.value,
        JobLevel: JobLevel.value,
        JobExperience: JobExperience.value,
        JobCareer: JobCareer.value,
        Content,
        RequireContent,
        BenefitContent,
      };

      const updatePost = await apiCaller(`posts/${id}`, "PUT", { data })
        .then((res) => res?.results)
        .catch(() => {
          toast.error("???? c?? l???i x???y ra. Vui l??ng th??? l???i sau.");
        })
        .finally(() => {
          setLoading(false);
        });
      if (updatePost.data) {
        toast.success("C???p nh???t c??ng vi???c th??nh c??ng.");
      }
    },
    [editor, id]
  );

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <h5 className="font-bold capitalize mb-4">S???a c??ng vi???c</h5>
      <TextInput
        type="text"
        name="Title"
        placeholder="Ti??u ????? c??ng vi???c..."
        required={true}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        <TextInput
          type="number"
          name="JobSalary"
          placeholder="M???c l????ng (VN??)"
          min={0}
          required={true}
        />
        <Select name="JobType" required={true}>
          <option value="">Lo???i vi???c l??m</option>
          <option>Th???c t???p</option>
          <option>To??n th???i gian c??? ?????nh</option>
          <option>To??n th???i gian t???m th???i</option>
          <option>B??n th???i gian c??? ?????nh</option>
          <option>B??n th???i gian t???m th???i</option>
          <option>Theo h???p ?????ng t?? v???n</option>
        </Select>
        <Select name="JobLevel" required={true}>
          <option value="">C???p b???c</option>
          <option>M???i t???t nghi???p / th???c t???p</option>
          <option>Nh??n vi??n</option>
          <option>Tr?????ng nh??m</option>
          <option>Tr?????ng ph??ng</option>
          <option>Ph?? gi??m ?????c</option>
          <option>Gi??m ?????c</option>
          <option>T???ng gi??m ?????c ??i???u h??nh</option>
        </Select>
        <Select name="JobExperience" required={true}>
          <option value="">Kinh nghi???m</option>
          <option>D?????i 1 n??m</option>
          <option>1 n??m</option>
          <option>2 n??m</option>
          <option>3 n??m</option>
          <option>4 n??m</option>
          <option>5 n??m</option>
          <option>Tr??n 5 n??m</option>
        </Select>
        <Select name="JobCareer" required={true}>
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
      <ReactQuill
        theme="snow"
        placeholder="M?? t??? c??ng vi???c"
        modules={{
          toolbar: { container: Container },
        }}
        className="h-height-100 mt-4"
        value={editor.Content}
        onChange={(value) => setEditor((prev) => ({ ...prev, Content: value }))}
      />
      <ReactQuill
        theme="snow"
        placeholder="Y??u c???u c??ng vi???c"
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
        placeholder="Quy???n l???i chi ti???t"
        modules={{
          toolbar: { container: Container },
        }}
        className="h-height-100 mt-4"
        value={editor.BenefitContent}
        onChange={(value) =>
          setEditor((prev) => ({ ...prev, BenefitContent: value }))
        }
      />
      <div className="mt-4">
        <Button type="submit">
          {loading && (
            <div className="mr-3">
              <Spinner size="sm" light={true} />
            </div>
          )}
          S???a Tin Tuy???n D???ng
        </Button>
      </div>
    </form>
  );
}
