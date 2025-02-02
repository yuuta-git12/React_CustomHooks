export default {
    
    testEnvironment: "jsdom",
    /** JestでTypeScriptを使うためのプリセット設定
     * ts-jestはJestでTypeTypeScript をトランスパイルし、型チェックを行うためのライブラリ
     * この設定により、.ts や .tsx ファイルを ts-jest を通して実行できます。
    */
    preset: "ts-jest",
    /**テストの実行環境を jsdom に指定しています。
     * jsdom は Node.js 上でブラウザ環境をエミュレートするためのライブラリで、主に React のコンポーネントのテストで必要になります。
     * 例えば、document や window などのブラウザ API を使うテストが実行できます。
     */
    testEnvironment: "jsdom",
    /**
     * Jest が .ts や .tsx のファイルをどのように処理するかを指定しています。
     * この設定では、.ts や .tsx のファイルが ts-jest を使って変換されます。
     * 	•	import や export などの ESModule 構文がそのまま動く
     * 	•	TypeScript の型情報を考慮したトランスパイルが行われる
     */
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    /**
     * CSS モジュールや SCSS を Jest でモックするための設定です。
     * Jest は通常、CSS ファイルを直接解釈できません
     * identity-obj-proxy を使うことで、テスト時に CSS のインポートが問題にならないようにします。
     */
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
  };
  