

# Electerm 样式重构版：上游代码同步与规范指南

本项目的核心目标是**对 Electerm 客户端进行视觉重构与样式进化**。为了保证我们自定义的样式不与官方（Upstream）频繁更新的功能代码发生冲突，并保持 Git 提交历史（Commit History）的绝对纯净，请严格按照以下规范进行开发和同步。

---

##  一、 环境初始化配置

在首次克隆项目或开始开发前，必须完成以下两项配置：

### 1. 关联官方上游仓库

除了你自己的 Fork 仓库（`origin`）外，需要将官方的源仓库添加为 `upstream`：

```bash
# 添加官方仓库
git remote add upstream git@github.com:electerm/electerm.git

# 验证远程仓库配置
git remote -v
# 预期输出应包含 origin(你的仓库) 和 upstream(官方仓库)

```

### 2. 全局配置 Pull 策略为 Rebase（变基模式）

开源社区与前端团队最推荐的线性合并方式，避免产生无意义的 `Merge branch...` 节点：

```bash
git config --global pull.rebase true

```

---

## 🔄 二、 日常开发与同步工作流

> 💡 **黄金法则**：高频同步！建议每 2-3 天在开发前执行一次同步，把冲突扼杀在萌芽状态。

### 步骤 1：确保本地工作区干净

在同步前，本地不能有未提交的代码。

```bash
git status
# 如果有未提交的改动，先 commit 或者使用 git stash 暂存

```

### 步骤 2：拉取并融合官方最新代码

通过 `rebase` 机制，将官方最新的全部改动“垫”在最底部，把我们修改样式的 Commit 重新“贴”在最顶层。

```bash
# 1. 切换到你的主开发分支
git checkout master

# 2. 获取官方最新的分支动态
git fetch upstream

# 3. 将官方最新代码融合到当前分支
git rebase upstream/master

```

### 步骤 3：处理可能发生的冲突（Conflict）

*如果你改动的文件官方刚好也改了，终端会暂停并提示冲突。*

1. 打开编辑器（如 VS Code），定位到冲突文件。
2. **解冲突原则**：保留官方新增的功能逻辑代码，同时将你重构的样式（类名、内联、CSS 结构）移植/应用进去。
3. 暂存已解决的文件：
```bash
git add .

```


4. 继续重放剩余的提交：
```bash
git rebase --continue

```


*(如果还有冲突，重复 1-4 步；如果没有冲突了，Git 会提示变基成功)*

### 步骤 4：同步到自己的 GitHub 仓库

当本地成功 Rebase 且测试运行无误后，将最新的干净代码推送到你的远程 Fork 仓库：

```bash
git push origin master

```

>  **注意**：如果 Rebase 过程中改变了历史提交顺序，普通的 `git push` 可能会被拒绝。此时可以安全地使用强推（前提是这是你个人的 Fork 仓库，没有其他人共同协作此分支）：
> `git push origin master --force-with-lease`

