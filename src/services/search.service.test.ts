import { FetchData, FetchSuggestionData } from "./search.service";
import { API } from "../api/api";

// Mock API module
jest.mock("../api/api", () => ({
  API: {
    search: jest.fn().mockResolvedValue({ data: "mocked search data" }),
    suggestion: jest.fn().mockResolvedValue({ data: "mocked suggestion data" }),
  },
}));

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

beforeEach(() => {
  jest.clearAllMocks(); // Reset the mocks before each test to avoid unexpected calls
});

describe("Search Service", () => {
  describe("FetchData", () => {
    it("should return mocked data on API success", async () => {
      const mockData = { data: "mocked search data" };
      (API.search as jest.Mock).mockResolvedValue(mockData);

      const result = await FetchData();
      expect(result).toEqual(mockData);
      expect(API.search).toHaveBeenCalledTimes(1); 
    });

    it("should return empty object on API failure", async () => {
      (API.search as jest.Mock).mockRejectedValue(new Error("API error"));

      const result = await FetchData();
      expect(result).toEqual({}); 
      expect(API.search).toHaveBeenCalledTimes(1); 
    });

    it("should handle empty response data", async () => {
      const emptyResponse = { data: [] }; 
      (API.search as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await FetchData();
      expect(result).toEqual(emptyResponse);
      expect(API.search).toHaveBeenCalledTimes(1); 
    });

    it("should handle unexpected data structure", async () => {
      const unexpectedResponse = { data: { unexpected: "structure" } };
      (API.search as jest.Mock).mockResolvedValue(unexpectedResponse);

      const result = await FetchData();
      expect(result).toEqual(unexpectedResponse);
      expect(API.search).toHaveBeenCalledTimes(1); 
    });

    // Add new test cases:
    it("should handle network errors gracefully", async () => {
      (API.search as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await FetchData();
      expect(result).toEqual({});
      expect(API.search).toHaveBeenCalledTimes(1);
    });

    it("should handle API timeout error", async () => {
      const timeoutError = new Error("Request timeout");
      timeoutError.name = "TimeoutError";
      (API.search as jest.Mock).mockRejectedValueOnce(timeoutError);

      const result = await FetchData();
      expect(result).toEqual({});
      expect(API.search).toHaveBeenCalledTimes(1);
    });
  });

  describe("FetchSuggestionData", () => {
    it("should return mocked suggestion data on API success", async () => {
      const mockSuggestionData = { data: "mocked suggestion data" };
      (API.suggestion as jest.Mock).mockResolvedValue(mockSuggestionData);

      const result = await FetchSuggestionData();
      expect(result).toEqual(mockSuggestionData);
      expect(API.suggestion).toHaveBeenCalledTimes(1); 
    });

    it("should return empty object on API failure", async () => {
      (API.suggestion as jest.Mock).mockRejectedValue(new Error("API error"));

      const result = await FetchSuggestionData();
      expect(result).toEqual({}); 
      expect(API.suggestion).toHaveBeenCalledTimes(1); 
    });

    it("should handle empty suggestion response data", async () => {
      const emptyResponse = { data: [] }; 
      (API.suggestion as jest.Mock).mockResolvedValue(emptyResponse);

      const result = await FetchSuggestionData();
      expect(result).toEqual(emptyResponse);
      expect(API.suggestion).toHaveBeenCalledTimes(1); 
    });

    it("should handle unexpected suggestion data structure", async () => {
      const unexpectedResponse = { data: { unexpected: "structure" } };
      (API.suggestion as jest.Mock).mockResolvedValue(unexpectedResponse);

      const result = await FetchSuggestionData();
      expect(result).toEqual(unexpectedResponse);
      expect(API.suggestion).toHaveBeenCalledTimes(1); 
    });

    it("should handle network errors gracefully", async () => {
      (API.suggestion as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      const result = await FetchSuggestionData();
      expect(result).toEqual({});
      expect(API.suggestion).toHaveBeenCalledTimes(1);
    });

    it("should handle API timeout error", async () => {
      const timeoutError = new Error("Request timeout");
      timeoutError.name = "TimeoutError";
      (API.suggestion as jest.Mock).mockRejectedValueOnce(timeoutError);

      const result = await FetchSuggestionData();
      expect(result).toEqual({});
      expect(API.suggestion).toHaveBeenCalledTimes(1);
    });
  });
});
