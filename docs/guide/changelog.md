<script setup>
import GithubReleases from '../.vitepress/theme/components/GithubReleases.vue'
</script>

# 更新日志

YH-UI 的版本说明以 GitHub Releases 为准。每次发布时，仓库会把当前版本的发布说明写入 GitHub Release；文档站只读取最近的公开发布记录，不再重复维护一份组件文档内的更新日志。

发布流程中仍会检查根目录 `CHANGELOG.md` 是否包含当前版本条目，并使用该条目生成 GitHub Release 正文。这样维护者只需要在发版前整理一次版本说明，用户在 GitHub 仓库和文档站看到的内容会保持一致。

如果下面的列表暂时无法加载，通常是 GitHub API 访问限制或网络问题。可以直接打开 GitHub Releases 页面查看完整发布记录、版本标签、发布时间和对应提交。

<GithubReleases locale="zh" />
