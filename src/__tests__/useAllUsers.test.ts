import { useAllUsers } from "../hooks/useAllUsers";
import { renderHook,act } from "@testing-library/react";
import axios from "axios";

/**
 * axiosをモック(模倣)するすることで、実際のAPI呼び出しを行わず、テスト環境で制御された
 * レスポンスを返すようにする
 * mockedAxiosはaxiosをモックした方のオブジェクト
 */
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * describeの中がテストの範囲
 */
describe("useAllUsersのテスト",() => {
    /**
     * itはtestにも置き換え可能で、テストケースを表す
     * テストケース1:
     * 以下のコードではrenderHookを使って、useAllUsersフックをレンダリング
     * その結果resultを検証する
     */
    it("初期状態の確認",()=>{
        const { result } = renderHook(() => useAllUsers());
        // それぞれのステートの初期値が空、falseになっていることを確認
        expect(result.current.userProfiles).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);
    });
    /**
     * テストケース２：
     * API取得成功時の動作
     */
    it("API 取得成功時の動作", async()=>{
        // axios.getが成功した場合に返すモックデータの設定
        const mockData = [
            {
                id:1,
                name:"John Do",
                username:"johndoe",
                email:"john@example.com",
                address: {
                    city: "New York",
                    suite: "Apt. 101",
                    street: "5th Ave",
                },
            },
        ];
        mockedAxios.get.mockResolvedValueOnce({ data: mockData });

        const { result } = renderHook(() => useAllUsers());
        await act(async ()=> {
            // getUsers関数を呼び出して、ユーザー情報を取得
            // await actで非同期処理を待機
            result.current.getUsers();
        });

        console.log(result.current);

        // getUsersが正常終了した場合、loadingとerrorにはfalseが返る
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(false);

        // getUsersが正常終了した場合、userProfilesにはAPIから取得した値が返る
        expect(result.current.userProfiles).toEqual([
            {
                id:1,
                name:"John Do(johndoe)",
                email:"john@example.com",
                address: "New YorkApt. 1015th Ave",
            },
        ]);
    })

    /**
     * テストケース3
     * API 取得失敗時の動作
     */
    it("API 取得失敗時の動作", async () => {
        mockedAxios.get.mockResolvedValueOnce(new Error("Network Error"));

        const { result } = renderHook(() => useAllUsers());

        await act(async () => {
            result.current.getUsers();
        });
        // getUsersが異常終了した場合、loadingにはfalse、errorにはtrueが返る
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(true);
        expect(result.current.userProfiles).toEqual([]);
    });
})