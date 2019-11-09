const fakeResponse = {
    data: {
        token: 'fakeTokenFakeToken123',
        role: 1,
    },
    status: 200,
};

export async function login() {
    const response = await new Promise((resolve) => {
        resolve(fakeResponse);
    });
    return response;
}
