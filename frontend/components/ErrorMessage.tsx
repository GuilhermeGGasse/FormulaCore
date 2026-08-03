//components/ErrorMessage.tsx

export function ErrorMessage({ message }: { message?: string })
{
    return(
        <p>Erro ao carregar {message}.</p>
    )
}