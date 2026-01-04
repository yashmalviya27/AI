const { GoogleGenAI } = require("@google/genai")


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            You are an expert in generating captions for images.
            You generate single caption for the image.
            Your caption should be short and concise.
            You use hashtags and emojis in the caption.
            If there is an couple image create an lovely and cute caption with cute cute emojis.
            write shaeri for couple image
            and sujest song also for them 
            `
        }
    });

    return response.text
}


module.exports = {generateCaption}