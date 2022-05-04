# 实现访问控制(Access Control)

## Context and Problem Statement

实现会员系统(membership system)的核心是如何实现访问控制。

### 名词定义：

- `用户`：指 App 用户
- `资源`：指 App 提供的服务，例如 Website Audit、Buyer Persona Templates
- `角色` : 可以访问特定的一组`资源`。用来实现用户级别功能，例如 Free、Basic、Pro 被看作是不同的角色。

## Decision Drivers

- 更好地应对变化
  - 可以方便的改变`用户`的`角色`
  - `角色` 本身可以方便的改变
    - 可以改变`角色`, 例如添加 Pro Max, 比 Pro 有更多的可用`资源`
    - 可以改变`角色`的可用`资源`，例如让 `Free` `角色`可以使用 Generate Personas from Analytics

## Considered Options

- 基于角色的访问控制
- 基于属性的的访问控制

## Decision Outcome

`基于属性的的访问控制` 更适合 易变、需要灵活配置的 的应用场景。

- Good, because 可以方便地应对`角色`的改变

## Pros and Cons of the Options

### 基于角色的访问控制

- Bad, because “角色”本身并不稳定

## Links

[什么是适用于 AWS 的 ABAC？](https://docs.aws.amazon.com/zh_cn/IAM/latest/UserGuide/introduction_attribute-based-access-control.html)
