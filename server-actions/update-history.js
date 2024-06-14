'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function updateHistory(formData){
    const id = formData.get('id')
    const story = formData.get('story')
    const summary = formData.get('summary')
    const poll = formData.get('poll')

    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore})
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user

    if (!user){
        console.error('User is not authenticated within updateHistory server action')
        return;
    }

    const {data, error} = await supabase
        .from('history')
        .update(
            {
                story,
                summary,
                poll,
            }
        ).match({id, user_id: user.id})

    if (error){
        console.error('Error updating data', error)
        return;
    }

    revalidatePath('/history')

    return {message: 'Success'}
}