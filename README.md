# Recduce Wildcard Patterns

Visual Studio Code extension to reduce wildcard pattern lines.

## Features

Compare each row and reduce the number of rows by wildcard matching.

Only `*` and `?` are supported.
`[characters]`, `[!characters]`, and `[^characters]` are not supported.

### Example 1

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

### Example 2

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

### Example 3

Brackets are treated as literal characters.

```
www1.example.com
www2.example.com
www[12].example.com
```

The above results in the following.

```
www1.example.com
www2.example.com
www[12].example.com
```

### Example 4

Star always defeats question mark in comparisons.

```
a?b?c
a?b*c
x*y?z
x?y*z
```

The above results in the following.

```
a?b*c
x*y?z
x?y*z
```

Here, the program does not decide the precedence between `x*y?z` and `x?y*z`.
However, you can make `x*y*z` by your hand.

## Usage

1.  Select lines.
    If no line is selected, the entire text is taken.
2.  Press Ctrl+Shift+P or F1 to show *Command Palett*.
3.  Execute **Reduce Wildcard Pattenrs**.
