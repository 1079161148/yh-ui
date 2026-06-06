<script setup>
import GithubReleases from '../../.vitepress/theme/components/GithubReleases.vue'
</script>

# Changelog

YH-UI release notes are maintained in GitHub Releases. During each release, the repository writes the current version notes into the GitHub Release; the documentation site only reads the latest public release records instead of duplicating changelog content in component docs.

The release flow still checks that the root `CHANGELOG.md` contains an entry for the current package version, then uses that entry to generate the GitHub Release body. Maintainers only need to prepare the release notes once before publishing, and users will see the same release content from both the GitHub repository and this documentation page.

If the list below cannot load, it is usually caused by GitHub API rate limits or network restrictions. Open the GitHub Releases page directly to inspect the full release history, tags, publish times, and related commits.

<GithubReleases locale="en" />
