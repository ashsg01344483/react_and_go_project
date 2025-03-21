# 構造体
**構造体とは？**
構造体（Struct）は、「いくつかのデータをひとまとめにしたもの」です。
たとえば、名前と年齢をセットにしたいとき、構造体を使えば簡単に管理できます。

**イメージ**
構造体は「データを入れる箱」のようなものです。それぞれの箱には、いろんな種類のデータ（文字列、数字など）を入れることができます。

例：人（Person）という箱を作る

```
type Person struct {
    Name string // 名前
    Age  int    // 年齢
}
```

`Person` は構造体の名前。
`Name` と `Age` は構造体の中に入れるデータ（フィールド）。

**構造体を使う例**

1. 構造体を作成する

```
type Person struct {
    Name string
    Age  int
}
```

2. 構造体にデータを入れる

```
func main() {
    // Person型のデータを作成
    person := Person{
        Name: "Alice",
        Age:  25,
    }
    fmt.Println(person) // 出力: {Alice 25}
}
```

3. フィールドにアクセスする

```
func main() {
    person := Person{Name: "Alice", Age: 25}

    // フィールドを表示
    fmt.Println(person.Name) // 出力: Alice
    fmt.Println(person.Age)  // 出力: 25
}
```

**構造体の特徴**
1. 複数のデータをまとめられる
   例えば「名前」「年齢」「住所」など、1人の情報をまとめて管理できます。

2. 型を自由に組み合わせられる
   構造体の中に、文字列、整数、さらには別の構造体を入れることも可能です。

**まとめ**
・構造体は「いくつかのデータをまとめる箱」。
・フィールドを使ってデータにアクセス＆操作できる。

# Goの関数
**関数の基本構造**
Goの関数の書き方は以下のようになります：

```
func 関数名(引数の名前 引数の型) 戻り値の型 {
    // 関数の中で行いたい処理を書く
    return 戻り値
}
```

例：

```
func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```

**複数の戻り値を返す**
Goでは複数の値を返すことができるのが特徴です。

```
func divide(a int, b int) (int, int) {
    quotient := a / b
    remainder := a % b
    return quotient, remainder
}
```

呼び出し例：

```
q, r := divide(10, 3)
fmt.Printf("商: %d, 余り: %d\n", q, r) // 出力: 商: 3, 余り: 1
```

**名前付き戻り値**
戻り値に名前を付けると、簡潔に書けます。
呼び出し方は同じです。

```
func divide(a int, b int) (quotient int, remainder int) {
    quotient = a / b
    remainder = a % b
    return
}
```

**関数の特徴と便利な機能**
1. 引数や戻り値がない関数

```
func sayHello() {
    fmt.Println("Hello, World!")
}
```

2. 複数の引数を受け取る関数
   **...**は可変長引数を表します。

```
func printNames(names ...string) {
    for _, name := range names {
        fmt.Println(name)
    }
}

printNames("Alice", "Bob", "Charlie")
// 出力:
// Alice
// Bob
// Charlie
```

3. 無名関数（匿名関数） 関数に名前を付けずに、その場で使うことができます。

```
func main() {
    add := func(a int, b int) int {
        return a + b
    }
    fmt.Println(add(2, 3)) // 出力: 5
}
```

**関数を他の関数に渡す（高階関数）**
関数を引数や戻り値として使うことができます。

```
func operate(a int, b int, op func(int, int) int) int {
    return op(a, b)
}

func main() {
    add := func(x int, y int) int { return x + y }
    result := operate(3, 4, add)
    fmt.Println(result) // 出力: 7
}
```

**関数の使いどころ**
・コードの再利用
同じ処理を複数箇所で使う場合、関数にまとめることで効率的になります。

・可読性を高める
コードを分割して関数にまとめると、プログラムの流れがわかりやすくなります。

・保守性を高める
関数ごとにテストを書いたり、問題が起きたときに該当部分を特定しやすくなります。

**まとめ**
・関数は特定の処理をまとめるためのもの。
・引数や戻り値を使って柔軟な処理が可能。
・複数の戻り値や無名関数など、Go独自の特徴も持っています。
・再利用性、可読性、保守性が向上するので、積極的に活用しましょう！

# 変数の型
**変数の型とは？**
プログラムでは、「データの種類」を「型（データ型）」で指定します。型は、変数がどんなデータを扱えるかを決めるものです。

例えば：
・数字
・文字
・真偽値（true/false）
Goは「静的型付け言語」なので、変数を使う前にその「型」を決めておく必要があります。

**Goの主な型一覧**
Goには以下のような基本的な型があります。

![スクリーンショット 2025-03-21 16.42.14.png](..%2FDesktop%2F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-21%2016.42.14.png)

**変数の型を指定する方法**
1. 明示的に型を指定する 型を指定して変数を宣言します。

```
var age int = 25
var name string = "Alice"
var pi float64 = 3.14
var isStudent bool = true
```

2. 型を省略する := を使うと型を自動的に判断してくれます。

```
age := 25          // int 型
name := "Alice"    // string 型
pi := 3.14         // float64 型
isStudent := true  // bool 型
```

**型が必要な理由**
型を使うことで、プログラムは以下のことをチェックできます：
1. 正しい操作の確認
   文字列に足し算（+）はできませんが、数値にはできます。
   型が間違っていると、コンパイル時にエラーが出ます。

```
var name string = "Alice"
var age int = 25
// fmt.Println(name + age) // エラー: 型が違うので計算できない！
```

2. メモリの効率的な利用
   型によって必要なメモリの大きさが決まります。
   Goでは効率的にメモリを管理するために型を使います。

**複合型（配列や構造体など）**
基本的な型のほかに、複合型と呼ばれるデータ型もあります。

・配列型
同じ型のデータをまとめて扱います。

```
var numbers [3]int = [3]int{10, 20, 30}
fmt.Println(numbers) // 出力: [10 20 30]
```

・スライス型
配列のように使えますが、サイズを後から変えられる便利な型です。

```
numbers := []int{10, 20, 30}
numbers = append(numbers, 40) // 要素を追加
fmt.Println(numbers) // 出力: [10 20 30 40]
```

・構造体型
複数の型をまとめて扱えます。

```
type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Alice", Age: 25}
fmt.Println(p.Name) // 出力: Alice
fmt.Println(p.Age)  // 出力: 25
```

**型を活用した便利な例**
1. 計算に使う 型を指定することで、安全に計算できます。

```
var a int = 10
var b int = 20
fmt.Println(a + b) // 出力: 30
```

2. 条件分岐に使う 真偽値（bool型）を使った条件分岐。

```
var isStudent bool = true
if isStudent {
    fmt.Println("学生です")
} else {
    fmt.Println("学生ではありません")
}
```

3. 文字列操作 文字列型を使ってテキストを扱います。

```
var message string = "Hello"
fmt.Println(message + " World!") // 出力: Hello World!
```

**Goで型を使うときのポイント**
1. 型の整合性を保つ
   型が異なる変数を一緒に計算することはできません。

```
var age int = 25
var name string = "Alice"
// fmt.Println(age + name) // エラー
```

2. 型変換が必要な場合
   異なる型を操作する場合は型変換が必要です。

```
var age int = 25
var ageAsString string = strconv.Itoa(age) // int を string に変換
fmt.Println(ageAsString) // 出力: "25"
```

3. ゼロ値（初期値）
   変数を初期化しない場合、Goはゼロ値を代入します。
   ・数値型：`0`
   ・文字列型：`""`（空文字）
   ・真偽値型：`false`

```
var num int
var text string
var isReady bool

fmt.Println(num)     // 出力: 0
fmt.Println(text)    // 出力: （空文字）
fmt.Println(isReady) // 出力: false
```

**まとめ**
・型は「データの種類」を指定するもの。
・Goには基本型（int, string, bool など）や複合型（配列、構造体など）がある。
・型を使うことで、プログラムが安全に動作し、エラーを未然に防げる。
・初学者のうちは基本型を理解することが大事ですが、構造体やスライスも覚えると便利

# レシーバー
**レシーバーとは？**
レシーバーとは、Goで「メソッド」を特定の型（例えば構造体）に関連付ける仕組みです。簡単に言うと、「どの構造体のデータを使うか」を教える目印のようなものです。
例えば、以下のコードを見てみましょう

```
func (uc *UserControllerStruct) GetAllUsers() {
    // この中で uc を使って構造体のデータにアクセスできる
    fmt.Println(uc.userService)
}
```

(uc *UserControllerStruct) の部分が「レシーバー」です。
uc は「UserControllerStruct という構造体を指しているよ」という意味です。
メソッド内で uc を使うと、UserControllerStruct のデータ（フィールド）にアクセスできます。

**ポインタレシーバーって何？**
* がついたレシーバーは「ポインタレシーバー」と呼ばれます。ポインタレシーバーを使うと、構造体のデータを直接操作できます。

**なぜポインタレシーバーを使うの？**
1. データを変更できる
   ポインタレシーバーを使うと、メソッド内で構造体のデータを変更できます。ポインタを使わない場合はデータのコピーを操作するだけなので、元のデータは変わりません。
   例↓

```
func (uc *UserControllerStruct) UpdateName(newName string) {
    uc.Name = newName // ポインタなので元のデータを直接変更
}
```

2. 効率が良い
   構造体のサイズが大きい場合、ポインタを使うことでデータのコピーを減らし、メモリを節約できます。

3. 一貫性が取れる
   他のメソッドでポインタレシーバーを使っているなら、すべてポインタレシーバーにするとコードが統一されます。

**レシーバーのイメージ**
レシーバーを使うことで、構造体に「機能（メソッド）」を追加できます。
例えば、「ユーザーを操作する機能」を UserControllerStruct という構造体に追加するイメージです。

```
type UserControllerStruct struct {
    Name string
}

func (uc *UserControllerStruct) PrintName() {
    fmt.Println(uc.Name) // uc を通して Name にアクセス
}
```

使い方↓

```
uc := &UserControllerStruct{Name: "Alice"} // 構造体を作る
uc.PrintName() // "Alice" と表示
```

**まとめ**
・レシーバーは、構造体に「機能」を追加するためのもの。
・ポインタレシーバーを使うと、データを直接操作できて効率が良い。
・構造体を「データ」、レシーバーを「そのデータを操作する機能」と考えると分かりやすい！

# ポインタ
**ポインタとは？**
ポインタは、「データそのもの」ではなく「データが保存されている場所（アドレス）」を指し示すものです。

**イメージ**
データが入っている箱を思い浮かべてください。
・通常の変数：箱そのものに入っているデータを指します。
・ポインタ：その箱の「住所（アドレス）」を覚えておいて、どこにデータがあるかを指し示します。

**なぜポインタを使うのか？**
1. データを直接操作できる
   大きなデータをコピーする代わりに、アドレスを渡して効率的に操作できます。
2. 複数の場所で同じデータを共有できる
   ポインタを渡すことで、同じデータを複数の関数や処理で使えます。
3. メモリを節約できる
   データをコピーするのではなく、アドレスだけを渡すためメモリ使用量が減ります。

**ポインタを使う例**
1. ポインタを宣言する
* を使ってポインタ型を定義します。

```
var p *int
```

2. ポインタにアドレスを代入する
   & を使って変数のアドレスを取得します。

```
var x int = 10
var p *int = &x // x のアドレスをポインタ p に代入
```

3. ポインタを使って値を操作する
* を使って、ポインタが指しているアドレスのデータにアクセスします。

```
var x int = 10
var p *int = &x

// ポインタを使って値を変更
*p = 20
fmt.Println(x) // 出力: 20
```

**具体例：ポインタの便利な使い方**
たとえば、関数で変数の値を変更したいとき：

```
// 値を2倍にする関数
func doubleValue(x *int) {
    *x = *x * 2 // ポインタを使って元の値を変更
}

func main() {
    num := 10
    fmt.Println("変更前:", num) // 出力: 変更前: 10

    doubleValue(&num) // num のアドレスを渡す
    fmt.Println("変更後:", num) // 出力: 変更後: 20
}
```

`doubleValue`  に `&num`（numのアドレス）を渡して、直接値を操作しています。

**ポインタが便利なケース**
1. 構造体のデータを操作する
   構造体のコピーではなく、元のデータを変更したいときにポインタを使います。

```
type Person struct {
    Name string
    Age  int
}

func updateAge(p *Person) {
    p.Age += 1 // ポインタを使って直接変更
}

func main() {
    alice := Person{Name: "Alice", Age: 25}
    updateAge(&alice) // alice のアドレスを渡す
    fmt.Println(alice.Age) // 出力: 26
}
```

2. メモリを節約する
   大きなデータ（例えば、大量のフィールドを持つ構造体）を関数に渡すときに、ポインタを使うとコピーを避けて効率的です。

**ポインタを使うときの注意点**
1. nilポインタの扱い
   初期化されていないポインタは nil になります。アクセスするとエラーが発生するので、必ず初期化してください。

```
var p *int
fmt.Println(p) // 出力: <nil>
```

2. メモリ管理
   Goではガベージコレクションがあるので、メモリ管理を意識する必要は少ないですが、ポインタを扱うときは注意しましょう。

**まとめ**
・ポインタは「データの場所（アドレス）」を指し示すものです。
・データを直接変更したり、大きなデータを効率的に扱うのに便利です。
・初心者のうちは少し難しく感じるかもしれませんが、構造体や関数と組み合わせて使うとその威力がわかります！

# スライス
**スライスとは？**
スライスは、Goでデータのコレクション（集まり）を扱うための型です。
・配列のように複数のデータをまとめて扱えます。
・配列と違い、要素数を自由に変更できる柔軟なデータ型です。

**スライスの特徴**
1. 要素数を変更できる
   スライスは後から要素を追加したり削除したりできます。
2. 配列の一部を切り出して作成可能
   スライスは配列や他のスライスから作ることができます。
3. ポインタ、長さ、容量で管理されている
   スライスは以下の3つで構成されています：
   ・`ポインタ`：実際のデータが保存されている場所を指すもの。
   ・`長さ（length）`：現在の要素数。
   ・`容量（capacity）`：スライスが内部で保持する配列の最大要素数。

**スライスの基本的な作り方**
1. リテラルを使う スライスを直接定義します。

```
numbers := []int{10, 20, 30} // 要素が10, 20, 30のスライス
fmt.Println(numbers)         // 出力: [10 20 30]
```

2. make関数を使う 空のスライスを作成します（サイズと容量を指定）。

```
numbers := make([]int, 5)    // 長さ5、要素はすべて0のスライス
fmt.Println(numbers)         // 出力: [0 0 0 0 0]
```

3. 配列から作成する 配列を部分的に切り取ってスライスを作成します。

```
arr := [5]int{1, 2, 3, 4, 5} // 配列
slice := arr[1:4]            // 配列の2番目から4番目を切り出す
fmt.Println(slice)           // 出力: [2 3 4]
```

**スライスの操作**
1. 要素の追加
   append関数を使うとスライスに要素を追加できます。

```
numbers := []int{10, 20}
numbers = append(numbers, 30, 40) // 要素を追加
fmt.Println(numbers)             // 出力: [10 20 30 40]
```

2. 要素の削除
   スライスの一部を切り出して再作成します。

```
numbers := []int{10, 20, 30, 40}
numbers = append(numbers[:1], numbers[2:]...) // 2番目の要素を削除
fmt.Println(numbers)                          // 出力: [10 30 40]
```

3. スライスの長さと容量を確認
   `len`関数で長さを、`cap`関数で容量を確認できます。

```
numbers := []int{10, 20, 30}
fmt.Println(len(numbers)) // 出力: 3
fmt.Println(cap(numbers)) // 出力: 3（配列の容量は初期値と同じ）
```

**スライスの便利な使い方**
1. forループで要素を扱う
   スライスのすべての要素を処理できます。

```
numbers := []int{10, 20, 30}
for i, num := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", i, num)
}
```

2. スライスを関数に渡す
   スライスは参照渡しなので、関数で変更した結果が元のスライスにも反映されます。

```
func doubleElements(numbers []int) {
    for i := range numbers {
        numbers[i] *= 2
    }
}

nums := []int{1, 2, 3}
doubleElements(nums)
fmt.Println(nums) // 出力: [2 4 6]
```

3. 文字列の操作
   スライスを使って文字列を効率的に扱うこともできます。

```
str := "Hello, Go!"
part := str[:5] // 最初の5文字を取得
fmt.Println(part) // 出力: Hello
```

**スライスと配列の違い**

![スクリーンショット 2025-03-21 16.44.43.png](..%2FDesktop%2F%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-03-21%2016.44.43.png)

**スライスを理解するポイント**
・`配列より柔軟 `スライスは配列のように複数のデータをまとめて扱えますが、サイズを変更できるのが大きな違いです。
・`データ操作が簡単` 要素を追加・削除したり、配列の一部だけ取り出して処理したりするのが簡単です。
・`効率的` スライスは元の配列を参照する仕組みなので、データのコピーを最小限に抑えられます。

**まとめ**
・スライスはGoでデータのコレクションを扱うための柔軟な型。
・サイズを自由に変更でき、appendやlenなどの便利な関数が使える。
・配列と違い、データ操作が簡単で効率的

# interface型
**interface型とは？**
Goのinterface型は、異なる型の共通の振る舞い（メソッド）を定義するための仕組みです。
「契約書」や「ルールブック」のようなもの
・interface型には、関数やメソッドの**「名前」と「引数や戻り値の型」**だけを定義します。
・実際の処理は、interfaceを「実装」する型が行います。

**なぜinterface型が必要？**
・異なる型に共通の振る舞いを持たせるため
例：犬と猫は違うけど、どちらも「鳴く」という振る舞いを持つ。
・柔軟で拡張性のあるコードを書くため
具体的な型に依存しないコードを作れるので、他の型を簡単に追加できます。
・テストのしやすさ
モック（テスト用のダミーオブジェクト）を使いやすくなります。

**interface型の基本的な使い方**
1. interface型の定義
   以下は「動物が鳴く」という共通の振る舞いを定義したinterface型です：

```
type Animal interface {
    Speak() string // 「鳴く」という振る舞いを定義
}
```

2. interface型を実装する型
   犬や猫がそれぞれ「鳴く」という振る舞いを持つ型として定義します：

```
type Dog struct{}

func (d Dog) Speak() string {
    return "ワンワン"
}

type Cat struct{}

func (c Cat) Speak() string {
    return "ニャーニャー"
}
```

3. interface型を使う
   異なる型のオブジェクト（犬や猫）を同じinterface型（Animal）として扱えます：

```
func MakeSound(a Animal) {
    fmt.Println(a.Speak())
}

func main() {
    dog := Dog{}
    cat := Cat{}

    MakeSound(dog) // 出力: ワンワン
    MakeSound(cat) // 出力: ニャーニャー
}
```

** interface型のポイント**
・interface型を実装するには？
nterface型のメソッドをすべて実装すれば、その型は自動的にそのinterface型を「満たしている」とみなされます。
明示的な「implements」の宣言は不要です。

・空のinterface型（`interface{}`）
何のメソッドも持たない特殊なinterface型で、すべての型を受け入れることができます。
例：

```
func PrintAnything(value interface{}) {
    fmt.Println(value)
}

func main() {
    PrintAnything(123)          // int型
    PrintAnything("Hello")      // string型
    PrintAnything([]int{1, 2})  // スライス型
}
```

・ interface型の型アサーション
interface型を特定の型として扱いたい場合に使います：

```
var a interface{} = "Hello"

str, ok := a.(string) // 型アサーション
if ok {
    fmt.Println("文字列:", str) // 出力: 文字列: Hello
} else {
    fmt.Println("string型ではありません")
}
```

**interface型のメリットと注意点**
メリット
・柔軟性が高い：
異なる型を共通の処理で扱える。

・拡張性が高い：
新しい型を追加する際に既存のコードを変更せずに済む。

・テストに便利：
モック（テスト用の型）を簡単に作れる。

注意点
・使いすぎに注意：
明確な型がわからなくなると、コードの読みやすさが下がる。

・空のinterface型（`interface{}`）は最後の手段：
型安全が失われるため、なるべく具体的なinterface型を使う。

**interface型の具体例**
1対多の操作
「動物たちを一斉に鳴かせる」コード：

```
func MakeAllSounds(animals []Animal) {
    for _, a := range animals {
        fmt.Println(a.Speak())
    }
}

func main() {
    dog := Dog{}
    cat := Cat{}
    animals := []Animal{dog, cat}

    MakeAllSounds(animals)
    // 出力:
    // ワンワン
    // ニャーニャー
}
```

**interface型を使うとどう便利？**
・実際のアプリケーション データベースを操作するコードで、MySQLやPostgreSQLなど複数のデータベースをサポートする場合に、共通のinterface型を作ることで柔軟に対応できます。

```
type Database interface {
    Connect() error
    Query(query string) (Result, error)
}
```

・テストのモック作成 テスト環境で、実際のデータベースではなくモックデータベースを使うことができます。

**まとめ**
・interface型は共通のルールを定める仕組み。
・Goでは「暗黙的な実装」を採用しているため、コードがシンプルで読みやすい。
・使い方に慣れると、柔軟で拡張性の高いコードが書けるようになります！
