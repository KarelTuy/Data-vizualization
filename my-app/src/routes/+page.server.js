import db from '$lib/db';

export const load = () => {
    const fetchData = async () => {
        let genes = []
        genes = await db.select('*')
                                .from('knownGene')
                                .limit(20)
        return JSON.parse(JSON.stringify(genes))
    }

    return {
        genes: fetchData()
    }
}