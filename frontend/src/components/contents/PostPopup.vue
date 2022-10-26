<template>
  <div class="contentsPopup cover">
    <div class="popupItem userBox">
      <div class="top">
        <div class="title">
          <h1></h1>
        </div>
        <button class="popupCloseBtn">
          <span class="material-icons"> close </span>
        </button>
      </div>
      <div class="popupBody">
        <div class="center">
          <div class="imgBox">
            <!-- <img
              :src="items.getPosts[0].imgUrl"
              :alt="items.getPosts[0].title"
            /> -->
          </div>
          <div class="infoBox">
            <div class="info">
              <span class="location">{{ items.getPosts[0].location }}</span>
              <span class="date">{{ items.getPosts[0].date }}</span>
              <span class="nickname">{{ items.getPosts[0].nickname }}</span>
            </div>
            <!-- <div class="heart">
              <span id="userHeartNum" class="heartNum" data-no="{{item.no}}">{{
                item.heartNum
              }}</span>
              <button id="popupEmptyHeart" class="on" data-no="{{item.no}}">
                <span class="material-icons-outlined"> favorite_border </span>
              </button>
              <button id="popupFullHeart" class="" data-no="{{item.no}}">
                <span class="material-icons"> favorite </span>
              </button>
            </div> -->
            <!-- <div class="heart">
              <span
                id="noUserHeartNum"
                class="heartNum"
                data-no="{{item.no}}"
                >{{ item.heartNum }}</span
              ><button id="noUserHeart" data-no="{{item.no}}">
                <span class="material-icons-outlined"> favorite_border </span>
              </button>
            </div> -->
          </div>
          <div class="txtBox">
            <p>{{ items.getPosts[0].desc }}</p>
          </div>
        </div>
        <!-- <div class="commentWrap">
          {% if userInfo %}
          <div class="inputBox">
            <label
              ><input
                type="text"
                name=""
                maxlength="50"
                class="commentInput"
                data-no="{{item.no}}"
            /></label>
            <button class="commentAddBtn" data-no="{{item.no}}">
              <span>등록</span>
            </button>
          </div>
          {% endif %}
          <div class="commentBox" data-no="{{item.no}}">
            {% for comment in comments %} {% if item.no == comment.contentsNo %}
            <div
              class="comment"
              data-no="{{comment.contentsNo}}"
              data-commentno="{{comment.no}}"
            >
              {% if userInfo.id == comment.id %}
              <div class="commentLeft">
                <span class="userNickname"> {{ comment.nickname }} </span>
                <p>{{ comment.comment }}</p>
              </div>
              <button class="commentDelBtn" data-commentno="{{comment.no}}">
                <span class="material-icons"> close </span>
              </button>
              {% else %}
              <div class="commentLeft">
                <span class="userNickname"> {{ comment.nickname }} </span>
                <p>{{ comment.comment }}</p>
              </div>
              {% endif %}
            </div>
            {% endif %} {% endfor %}
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import {mainStore} from "@/store/contents";
import {postStore} from "@/store/popup";
export default {
  name: "PostPopup",
  setup() {
    const items = mainStore();
    const post = postStore();
    return {
      items,
      post,
    };
  },
};
</script>

<style lang="scss" scoped></style>
