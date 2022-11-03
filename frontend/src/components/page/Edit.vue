<template>
  <section id="update" class="subSection">
    <div class="title">
      <h1>Edit Post</h1>
    </div>
    <form action="" method="POST" enctype="multipart/form-data">
      <div class="imgBox">
        <img alt="" :src="src" />
      </div>
      <div class="inputBox">
        <label class="file"
          ><span>사진찾기</span
          ><input
            type="file"
            name="image"
            id="image"
            ref="imgFile"
            @input="image = $event.target.value"
            @change="sendImg()" />
          <input
            name="fileName"
            id="fileName"
            :value="image"
            placeholder="첨부 사진"
            readonly
            required
        /></label>
      </div>
      <div class="inputBox dateBox" @click="openDate()">
        <label
          ><input
            type="text"
            name="date"
            id="date"
            :value="editContents.date"
            @input="date"
            readonly
            required
          /><span>📅</span></label
        >
      </div>

      <DatePicker
        v-model="date"
        :model-config="modelConfig"
        locale="en"
        v-if="isCalendar"
        color="green"
        title-position="left"
        :max-date="new Date()"
        @click.stop="closeDate()"
      />
      <div class="inputBox">
        <label
          ><span>제목</span
          ><input
            type="text"
            name="title"
            id="title"
            required
            maxlength="20"
            :value="editContents.title"
            @input="title = $event.target.value"
        /></label>
      </div>
      <div class="inputBox">
        <label
          ><span>여행지</span
          ><input
            type="text"
            name="location"
            id="location"
            :value="editContents.location"
            required
            maxlength="20"
            @input="location = $event.target.value"
        /></label>
      </div>
      <div class="inputBox">
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          placeholder="내용을 입력하세요"
          required
          :value="editContents.desc"
          @input="desc = $event.target.value"
        ></textarea>
      </div>
      <div class="btns">
        <button id="createBtn" @click.prevent="update()">
          <span>수정</span>
        </button>
        <button type="reset" id="resetBtn" @click="resetUpdate()">
          <span>취소</span>
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import {defineProps} from "vue";
import {ref} from "@vue/reactivity";
import {DatePicker} from "v-calendar";
import {editStore} from "@/store/contents";
import {storeToRefs} from "pinia";

const edit = editStore();
const {src, cloudinaryFileName, editContents} = storeToRefs(edit);

const props = defineProps({
  num: String,
});

edit.goEditPage(props.num);

let date = ref("");
let title = ref("");
let location = ref("");
let desc = ref("");
const imgFile = ref();
let image = ref("");
let isCalendar = ref(false);

// 달력 옵션
const modelConfig = {
  type: "string",
  mask: "YYYY-MM-DD",
};

// 달력 열고 닫기
function openDate() {
  this.isCalendar = true;
}
function closeDate() {
  this.isCalendar = false;
}

// 파일 첨부하고 바로 사진 띄우기(이미지 주소 받기)
async function sendImg() {
  let sendImgData = new FormData();
  sendImgData.append("image", imgFile.value.files[0]);
  try {
    // 폼데이터 체크 식
    // for (const pair of sendImgData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    edit.sendImgFetch(sendImgData);
  } catch (err) {
    console.log(err);
  }
}

//글 정보 보내기
function update() {
  edit.sendUpdateFetch({
    title: title.value,
    date: date.value,
    location: location.value,
    desc: desc.value,
    imgUrl: src.value,
    fileName: cloudinaryFileName.value,
    no: props.num,
  });
}

// 수정 취소하고 메인페이지로 이동
function resetUpdate() {
  window.location.href = "/";
}
</script>

<style lang="scss" scoped>
@import url("v-calendar/dist/style.css");
.subSection {
  width: 60vw;
  margin: 0 auto;
  padding: 50px 0 100px 0;
  .title {
    margin-bottom: 30px;
    h1 {
      font-weight: 700;
    }
  }
  form {
    .imgBox {
      width: 100%;
      height: 60vh;
      margin-bottom: 20px;
      background-color: #fffbfb;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .file {
      cursor: pointer;
    }
    .inputBox {
      width: 100%;
      margin-bottom: 10px;
      padding: 10px 30px;
      border: 1px solid #aaa;
      border-radius: 10px;
      &:nth-child(5) {
        margin-bottom: 30px;
      }
      label {
        display: flex;
        justify-content: space-between;
        position: relative;
        &.myPageLabel::before {
          left: 12%;
        }
        &::before {
          display: block;
          width: 1px;
          height: calc(100% + 20px);
          position: absolute;
          top: -10px;
          left: 90px;
          z-index: 1;
          content: "";
          background-color: #ddd;
        }
        span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
        }
        input {
          width: 86%;
          border: none;
          font-family: "GangwonEdu_OTFBoldA";
          font-size: 19px;
          line-height: 1.3;
          vertical-align: bottom;
          outline: none;
          &::placeholder {
            font-size: 20px;
          }
        }
        input[type="file"] {
          width: 0;
          height: 0;
          position: absolute;
          overflow: hidden;
          padding: 0;
          border: 0;
        }
      }
      textarea {
        width: 100%;
        height: 100%;
        border: none;
        font-family: "GangwonEdu_OTFBoldA";
        font-size: 19px;
        resize: none;
        outline: none;
      }
    }
    .dateBox {
      width: 25%;
      cursor: pointer;
      label {
        cursor: pointer;
        &::before {
          display: none;
        }
        span {
          position: absolute;
          top: 40%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
    .btns {
      margin-top: 50px;
      text-align: right;
      button {
        padding: 5px 10px;
        background-color: #333;
        &:not(:last-child) {
          margin-right: 10px;
        }
        span {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }
}
.vc-container {
  position: absolute;
  z-index: 1000;
}
.errBody {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
</style>
