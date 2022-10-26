<template>
  <li class="post">
    <div class="contentsBox">
      <div class="img">
        <img src="{{item.imgUrl}}" alt="{{ item.title }}" />
      </div>
      <div class="txtBox">
        <div class="top">
          <div class="titleBox">
            <span class="location">{{ item.location }}</span>
            <h1>{{ item.title }}</h1>
          </div>
        </div>
        <p>{{ item.desc }}</p>
      </div>
    </div>
    <div class="heart">
      <button id="emptyHeart" class="on" data-no="{{item.no}}">
        <span class="material-icons-outlined"> favorite_border </span>
      </button>
      <button id="fullHeart" class="" data-no="{{item.no}}">
        <span class="material-icons"> favorite </span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Post",
};
</script>

<style lang="scss" scoped></style>
