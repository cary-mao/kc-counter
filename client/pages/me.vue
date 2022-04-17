<template>
  <div class="page">
    <CellGroup class="cell-group">
      <Cell is-link class="user-wrap" center size="large">
        <div class="user">
          <div class="user-avatar">
            <VanImage
              width="70"
              height="70"
              fit="cover"
              radius="6"
              src="/user.jpeg"
            />
          </div>
          <div class="user-info">
            <div class="user-name">隆</div>
            <div class="user-id">id: 123456789</div>
          </div>
        </div>
      </Cell>
    </CellGroup>
    <CellGroup class="cell-group">
      <Cell
        is-link
        icon="setting-o"
        title="设置"
        size="large"
        center
        clickable
        @click="handleSettingClick"
      >
      </Cell>
    </CellGroup>
  </div>
</template>

<script setup>
import { Image as VanImage, Icon, Cell, CellGroup } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

function handleSettingClick() {
  router.push("/setting");
}
</script>

<style lang="stylus" scoped>
.user {
  display: flex;

  &-avatar {
    // 两个flex相邻，不会导致info内容高于avatar
    display: flex;
    margin-right: 10px;
  }

  &-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &-name {
    margin-top: 4px;
    font-size: 24px;
    font-weight: bold;
  }

  &-id {
    color: #aaa;
    font-size: 16px;
  }
}
</style>