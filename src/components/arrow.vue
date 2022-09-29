<template>
  <button class="arrow ">
    <img  src="@/assets/arrow.png" alt="Arrow">
  </button>

</template>

<script>
export default {
  name: "arrow"
}
</script>

<style lang="scss">
.arrow {
  position: relative;
  width: 15px;
  height: 100%;
  transition: 0.2s ease-in-out;

  img {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 15px;
    @include transition();
    &:hover {
      opacity: 0.7;
    }
  }

  &.top {
   transform: rotate(-90deg);
  }
  &.bottom {
    transform: rotate(90deg);
  }
  &.right {
    transform: rotate(0deg);
  }
  &.left {
    transform: rotate(180deg);
  }
}
</style>
