# Recduce Wildcard Patterns

Visual Studio Code extension to reduce wildcard pattern lines.

## Features

Compare each row and reduce the number of rows by wildcard matching.

Only `*` and `?` are supported.
`[characters]`, `[!characters]`, and `[^characters]` are not supported.

## Usage

1.  Select lines.
    If no line is selected, the entire text is taken.
2.  Press Ctrl+Shift+P or F1 to show *Command Palett*.
3.  Execute **Reduce Wildcard Pattenrs**.

## Example 1

A star matches any string, including empty string.

```
www.example.com
*.example.com
www.example.org
www*.example.org
```

The above results in the following.

```
*.example.com
www*.example.org
```

## Example 2

A question mark matches any single character.

```
www1.example.com
www2.example.com
www?.example.com
```

The above results in the following.

```
www?.example.com
```

## Example 3

In this extension, brackets are treated as literal characters.

```
www[12].example.com
www1.example.com
www2.example.com
www?.example.com
```

The above results in the following.

```
www[12].example.com
www?.example.com
```
