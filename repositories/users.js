const fs = require('fs');

class UsersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        this.filename = filename;
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    };

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename, {
            encoding: 'utf-8'
        }));
    }

    async create(attributes) {
        const records = await this.getAll();
        records.push(attributes);
        await this.writeAll(records);
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }
};

const test = async () => {
    const repo = new UsersRepository('users.json');
    repo.create({ email: 'test@test.test', password: 'password' })
    const users = await repo.getAll();
    console.log(users)
}

test();
