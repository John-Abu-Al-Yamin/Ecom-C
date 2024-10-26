import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import avatar from "../../images/avatar.png";
import add from "../../images/add.png";
import MultiImageInput from "react-multiple-image-input";
import { CompactPicker } from "react-color";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productAction";

const AdminAddProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, []);

  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allBrand.brand);
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
    console.log(selectedList);
  };
  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
    console.log(selectedList);
  };

  const [options, setOptions] = useState([]);

  //   value image product
  const [images, setImages] = useState([]);

  // value state
  const [proName, setProName] = useState("");
  const [proDescription, setProDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [qty, setQty] = useState("");

  const [catID, setCatID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [subCatID, setSubCatID] = useState([]);
  const [selectedSubID, setSelectedSubID] = useState([]);

  // Color Picker
  const [showColor, setShowColor] = useState(false);
  const [colors, setColors] = useState([]);
  const handelChangeCoplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };

  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  //   when select category store id
  const onSelectCategory = async (e) => {
    if (e.target.value !== "0") {
      await dispatch(getOneCategory(e.target.value));
    }
    setCatID(e.target.value);
  };

  useEffect(() => {
    if (catID !== "0") {
      if (subCat.data) {
        setOptions(subCat.data);
      }
    }
  }, [catID]);
  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // Convert base 64 to file

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // save data
  const handelSubmit = async (e) => {
    e.preventDefault();

    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");

    const formatData = new FormData();
    formatData.append("title", proName);
    formatData.append("description", proDescription);
    formatData.append("quantity", qty);
    formatData.append("price", priceBefore);
    formatData.append("imageCover", imgCover);
    formatData.append("category", catID);
    formatData.append("brand", brandID);

    colors.map((color) => formatData.append("availableColors", color));
    selectedSubID.map((id) => formatData.append("subcategory", id));

    console.log(proName, proDescription, qty, priceBefore, imgCover, catID);

    await dispatch(createProduct(formatData));
  };

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
        <Col sm="8">
          <div className="text-form pb-2"> صور للمنتج</div>

          <MultiImageInput
            theme={"light"}
            images={images}
            setImages={setImages}
            allowCrop={false}
            max={4}
          />

          <input
            value={proName}
            onChange={(e) => setProName(e.target.value)}
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
          />
          <textarea
            value={proDescription}
            onChange={(e) => setProDescription(e.target.value)}
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
          />
          <input
            value={priceBefore}
            onChange={(e) => setPriceBefore(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
          />
          <input
            value={priceAfter}
            onChange={(e) => setPriceAfter(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="سعر  بعد الخصم"
          />
          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة"
          />

          <select
            name="cat"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectCategory}
          >
            <option value="0">اختر التصنيف الرئيسي</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />
          <select
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectBrand}
          >
            <option value="0">اختر الماركة</option>
            {brand.data
              ? brand.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
          <div className="mt-1 d-flex">
            {colors.length >= 1
              ? colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => removeColor(color)}
                      className="color ms-2 border mt-1"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })
              : null}

            <img
              onClick={() => setShowColor(!showColor)}
              src={add}
              alt=""
              width="30px"
              height="35px"
              className=""
              style={{ cursor: "pointer" }}
            />
            {showColor && (
              <CompactPicker onChangeComplete={handelChangeCoplete} />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">
            حفظ التعديلات
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddProducts;
