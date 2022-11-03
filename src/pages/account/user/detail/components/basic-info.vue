<template>
  <a-descriptions :title="`${record.nick}`" layout="vertical" bordered>
    <a-descriptions-item label="头像">
      <my-image :url="record.avatar_url"></my-image>
    </a-descriptions-item>
    <a-descriptions-item label="背景图">
      <my-image :url="record.background_img_url"></my-image>
    </a-descriptions-item>
    <a-descriptions-item label="待审核背景图">
      <my-image :url="record.wait_review_background_img_url"></my-image>
    </a-descriptions-item>
    <a-descriptions-item label="用户状态">       <a-badge :status="record.state == 0 ? 'processing' : 'error'" :text="record.state_text" />     </a-descriptions-item>
    <a-descriptions-item label="等级">{{ record.level }}</a-descriptions-item>
    <a-descriptions-item label="舔狗数">{{ record.hidden_love_user_number }}</a-descriptions-item>
    <a-descriptions-item label="推荐数">{{ record.recommend_num }}</a-descriptions-item>
    <a-descriptions-item label="举报数">{{ record.inform_num }}</a-descriptions-item>
    <a-descriptions-item label="违规数">{{ record.illegal_num }}</a-descriptions-item>
    <a-descriptions-item label="金币数">{{ record.gold_number }}</a-descriptions-item>
    <a-descriptions-item label="是否白名单">{{ record.is_white_user }}</a-descriptions-item>
    <a-descriptions-item label="生日">{{ record.birthday }}</a-descriptions-item>
    <a-descriptions-item label="推荐时间">{{ record.create_time }}</a-descriptions-item>
    <a-descriptions-item label="禁言时间">{{ record.banned_to_post_deadline }}</a-descriptions-item>
    <a-descriptions-item label="封禁时间">{{ record.bang_deadline }}</a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts" setup>
import { RecordItem } from "#/api/account/user";

defineProps<{
  record: RecordItem;
}>();
</script>

<style lang="less" scoped></style>
