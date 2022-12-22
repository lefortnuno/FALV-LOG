function AlerteAllUser() {
    return (
        <>
            <div class="alert alert-warning bg-warning border-0 alert-dismissible fade show" role="alert">
                <i class="bi bi-exclamation-triangle">
                    Tout employé de l'ONN a accès à cette page, ceci implique une responsabilité à tout utilisateur
                    <br />
                    À utiliser avec professionnalisme
                </i>
                <span></span>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    );
}
export default AlerteAllUser;
